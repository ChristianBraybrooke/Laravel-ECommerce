<ul class="options_list">
  @foreach ($form['sections']['data'] ?? [] as $key => $section)
    <li class="cart_option"><span class="font-weight-bold">
        @foreach ($section['fields']['data'] as $key => $field)
            @php
              $value = $options[$field['name']]['value'] ?? null;
            @endphp
            @if ($value)<strong>{{ $field['name'] ?? '' }}</strong>: {{ $field['prepend'] ?? '' }}{{ $value }}{{ $field['append'] ?? '' }}@if (!$loop->last),@endif @endif
        @endforeach
    </li>
  @endforeach
</ul>
