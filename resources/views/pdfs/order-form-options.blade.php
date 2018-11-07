<ul class="options_list">
  @foreach ($form['sections']['data'] ?? [] as $key => $section)
      @foreach ($section['fields']['data'] as $key => $field)
        @php
          $value = $options[$field['name']]['value'] ?? null;
        @endphp
        @if ($value)
          @if ($loop->first)
            <li class="cart_option"><span class="font-weight-bold">
          @endif
            <strong>{{ $field['name'] ?? '' }}</strong>: {{ $field['prepend'] ?? '' }}{{ $value }}{{ $field['append'] ?? '' }}@if (!$loop->last),@endif
          @if ($loop->last)
            </li>
          @endif
        @endif
      @endforeach
  @endforeach
</ul>
