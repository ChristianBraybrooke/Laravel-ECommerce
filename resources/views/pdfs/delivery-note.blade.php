<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Print</title>
    @component('ecommerce::pdfs.invoice-styling')
    @endcomponent
</head>

<body>

  @if (!isset($orders->id) && $orders)
      @foreach ($orders as $key => $order)
          @component('ecommerce::pdfs.delivery-note-box', ['order' => $order, 'page_break' => true])
          @endcomponent
      @endforeach
  @elseif(isset($orders->id) && !empty($orders->id))
      @component('ecommerce::pdfs.delivery-note-box', ['order' => $orders, 'page_break' => false])
      @endcomponent
  @else
      <h1 style="text-align:center;">Unable to generarate delivery note.</h1>
  @endif

  @if (isset($pdf) && $pdf)

  @else
      @component('ecommerce::pdfs.print-btn')
      @endcomponent
  @endif




</body>
</html>
