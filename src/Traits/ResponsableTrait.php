<?php

namespace ChrisBraybrooke\ECommerce\Traits;

trait ResponsableTrait
{

    /**
     * Format the query and return a standardised basic response.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeBasicResponse($query)
    {
        $request = request();

        if ($request->filled('search') && !empty($this->responsableSearch())) {
            $i = 0;
            foreach ($this->responsableSearch() as $key => $search) {
                $i++;
                if ($i === 1) {
                    $query->where("{$this->getTable()}.{$search}", 'like', '%' . $request->search . '%');
                } else {
                    $query->orWhere("{$this->getTable()}.{$search}", 'like', '%' . $request->search . '%');
                }
            }
        }

        $query = $query->responseAdapter();

        return $query;
    }

    /**
     * Add the response adapter scope to the query
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeResponseAdapter($query)
    {
        $request = request();

        if ($request->filled('orderBy') && array_key_exists($request->orderBy, $this->responsableOrderByAlias())) {
            $orderBy = $this->responsableOrderByAlias()[$request->orderBy];
        } else {
            $orderBy = $this->responsableOrderBy();
        }

        $direction = $request->filled('ascending') ?
            ($request->ascending == 1 ? "ASC" : "DESC") :
            $this->responsableDirection();
        $limit = $request->filled('limit') ? $request->limit : $this->responsableLimit();

        $query = $this->responsableExtendQuery($query, $request);

        return $query->select("{$this->getTable()}.*")
                     ->orderBy($orderBy, $direction)
                     ->paginate($limit);
    }

    /**
     * Format the query and return a standardised basic response.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function searchIsString()
    {
        $request = request();

        if ($request->filled('search') && is_object(json_decode($request->search))) {
            return false;
        }

        return is_string($request->search);
    }

    /**
     * The default direction of models.
     *
     * @return string
     */
    private function responsableDirection()
    {
        return "DESC";
    }

    /**
     * The default collumn to order results by.
     *
     * @return string
     */
    private function responsableOrderBy()
    {
        return "id";
    }

    /**
     * The default amount of results to return.
     *
     * @return int
     */
    private function responsableLimit()
    {
        return 15;
    }

    /**
     * Which collumns to use for search.
     *
     * @return array
     */
    private function responsableSearch()
    {
        return [
          'id',
          'name'
        ];
    }

    /**
     * Which collumns to use for search.
     *
     * @return array
     */
    private function responsableOrderByAlias()
    {
        return [
          'name' => 'name',
        ];
    }

    /**
     * Extend the query used.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function responsableExtendQuery($query, $request)
    {
        return $query;
    }
}
