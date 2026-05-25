<?php

namespace App\Exports;

use App\Models\Registration;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class RegistrationsExport implements FromQuery, WithHeadings, WithMapping, WithStyles
{
    public function __construct(private bool $paidOnly = false) {}

    public function query()
    {
        return Registration::query()
            ->with('event')
            ->when($this->paidOnly, fn ($q) => $q->where('payment_status', 'paid'));
    }

    public function headings(): array
    {
        return [
            'ID',
            'Institution',
            'Event',
            'PED Name',
            'PED Contact',
            'Captain Name',
            'Captain Email',
            'Captain Contact',
            'Payment Status',
            'Amount (₹)',
            'PG Merchant Txn No',
            'PG Payment ID',
            'Registered At',
        ];
    }

    public function map($row): array
    {
        return [
            $row->id,
            $row->institution_name,
            $row->event?->name ?? '-',
            $row->ped_name,
            $row->ped_contact,
            $row->captain_name,
            $row->captain_email,
            $row->captain_contact,
            $row->payment_status,
            $row->amount,
            $row->pg_merchant_txn_no ?? '-',
            $row->pg_payment_id ?? '-',
            $row->created_at->format('d M Y, h:i A'),
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            1 => ['font' => ['bold' => true]],
        ];
    }
}
