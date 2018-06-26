<?php

namespace ChrisBraybrooke\ECommerce\Http\Resources;

use Illuminate\Http\Resources\Json\Resource;

class PaymentResource extends Resource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'reference' => $this->when(requestIncludes('reference'), $this->reference),
            'method' => $this->when(requestIncludes('payment.method'), $this->method),
            'currency' => $this->when(requestIncludes('payment.currency'), $this->currency),
            'amount' => $this->when(requestIncludes('payment.amount'), $this->amount),
            'fee' => $this->when(requestIncludes('payment.fee'), $this->fee),

            $this->mergeWhen(requestIncludes('payment.source'), [
                'source_id' => $this->source_id,
                'source_brand' => $this->source_brand,
                'source_country' => $this->source_country,
                'source_last4' => $this->source_last4,
                'source_exp_month' => $this->source_exp_month,
                'source_exp_year' => $this->source_exp_year,
            ]),

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
