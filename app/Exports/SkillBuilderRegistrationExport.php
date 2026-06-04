<?php

namespace App\Exports;

use App\Models\SkillBuilderRegistration;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class SkillBuilderRegistrationExport implements FromQuery, ShouldAutoSize, WithHeadings, WithMapping, WithStyles
{
    /**
     * @param  string|null  $statusFilter  Pass 'paid' to export only paid registrations, null for all.
     */
    public function __construct(private ?string $statusFilter = null) {}

    public function query()
    {
        $query = SkillBuilderRegistration::query()->orderBy('created_at', 'desc');

        if ($this->statusFilter !== null) {
            $query->where('payment_status', $this->statusFilter);
        }

        return $query;
    }

    public function headings(): array
    {
        return [
            '#',
            'Child Name',
            'Age',
            'Programme',
            'Parent / Guardian',
            'Phone',
            'Email',
            'Payment Status',
            'Amount (₹)',
            'Payment ID',
            'Merchant Txn No',
            'Registered At (IST)',
        ];
    }

    /**
     * @param  SkillBuilderRegistration  $row
     */
    public function map($row): array
    {
        return [
            $row->id,
            $row->child_name,
            $row->child_age,
            $row->programme,
            $row->parent_name,
            $row->phone,
            $row->email ?? '—',
            strtoupper($row->payment_status),
            $row->amount,
            $row->pg_payment_id ?? '—',
            $row->pg_merchant_txn_no ?? '—',
            $row->created_at->format('d M Y, h:i A'),
        ];
    }

    public function styles(Worksheet $sheet): array
    {
        return [
            // Bold header row
            1 => ['font' => ['bold' => true]],
        ];
    }
}
