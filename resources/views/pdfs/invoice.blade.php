<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>Print Invoice</title>
    @component('ecommerce::pdfs.invoice-styling')
    @endcomponent
</head>

<body>

  @if (!isset($orders->id) && $orders)
      @foreach ($orders as $key => $order)
          @component('ecommerce::pdfs.invoice-box', ['order' => $order, 'page_break' => true])
          @endcomponent
      @endforeach
  @elseif(isset($orders->id) && !empty($orders->id))
      @component('ecommerce::pdfs.invoice-box', ['order' => $orders, 'page_break' => false])
      @endcomponent
  @else
      <h1 style="text-align:center;">Unable to generarate invoice.</h1>
  @endif

  @if (isset($pdf) && $pdf)

  @else
      @component('ecommerce::pdfs.print-btn')
      @endcomponent
  @endif




</body>
</html>
