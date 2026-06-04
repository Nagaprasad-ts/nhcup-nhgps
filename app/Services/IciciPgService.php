<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class IciciPgService
{
    /**
     * Call the ICICI PG initiateSale API.
     *
     * Builds the payload (with secureHash), posts to the UAT/live endpoint,
     * and returns the decoded JSON response array.
     *
     * @param  array<string, string>  $params  Request fields (without secureHash)
     * @return array<string, mixed>
     */
    public function initiateSale(array $params): array
    {
        $payload = $params;
        $payload['secureHash'] = $this->generateSecureHash($payload);

        $response = Http::timeout(30)
            ->connectTimeout(10)
            ->withHeaders(['Content-Type' => 'application/json'])
            ->post(config('services.icici_pg.api_url'), $payload);

        $response->throw();

        return $response->json();
    }

    /**
     * Generate the HMAC-SHA256 secureHash.
     *
     * Per ICICI PG spec (Step 2):
     *   1. Sort all fields alphabetically by key.
     *   2. Concatenate all VALUES (not keys) in that sorted order.
     *   3. Hash the resulting string with HMAC-SHA256 using the key secret.
     *
     * @param  array<string, string>  $data  Fields to hash (must NOT include secureHash itself)
     */
    public function generateSecureHash(array $data): string
    {
        ksort($data);

        $plainText = implode('', array_values($data));

        return hash_hmac('sha256', $plainText, config('services.icici_pg.key_secret'));
    }

    /**
     * Verify the secureHash on an ICICI PG response (return URL POST payload).
     *
     * @param  array<string, string>  $responseData  All POST params including secureHash
     */
    public function verifyResponseHash(array $responseData): bool
    {
        $receivedHash = $responseData['secureHash'] ?? null;

        if (! $receivedHash) {
            return false;
        }

        $dataToVerify = $responseData;
        unset($dataToVerify['secureHash']);

        $expectedHash = $this->generateSecureHash($dataToVerify);

        return hash_equals($expectedHash, $receivedHash);
    }

    /**
     * Build the merchantTxnNo from a registration ID.
     *
     * Format: "SB" + 10-digit Unix timestamp + 8-digit zero-padded ID = exactly 20 chars.
     *
     * The timestamp component ensures the txnNo is globally unique even when the
     * database is reset (migrate:fresh) and auto-increment IDs restart from 1.
     * ICICI retains all historical txnNos, so a plain ID-only format would cause
     * P1006 ("Merchant reference number should be unique") after any DB reset.
     *
     * Example: SB178042316800000001
     *          ^^            ← "SB" prefix (Skill Builder)
     *            ^^^^^^^^^^  ← Unix timestamp (10 digits, valid until ~year 2286)
     *                      ^^^^^^^^ ← registration ID, zero-padded to 8 digits
     */
    public function buildMerchantTxnNo(int $registrationId): string
    {
        return 'SB'
            .str_pad((string) now()->timestamp, 10, '0', STR_PAD_LEFT)
            .str_pad((string) $registrationId, 8, '0', STR_PAD_LEFT);
    }

    /**
     * Assemble the redirect URL the user should be sent to.
     *
     * Per ICICI spec (Step 6): redirectURI?tranCtx=<value>
     */
    public function buildPaymentUrl(string $redirectUri, string $tranCtx): string
    {
        return $redirectUri.'?tranCtx='.urlencode($tranCtx);
    }
}
