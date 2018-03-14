<div class="toolbar no_print">
    <button autofocus onclick="window.print()" class="btn print_btn no_print">Print</button>
</div>

<style>
    .toolbar {
      width: 100%;
      position: fixed;
      bottom: 0px;
      left: 0px;
      background: #eaeaea;
      text-align: center;
      border-top: solid 1px #bfbfbf;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .print_btn {
        font-weight: bold;
        font-size: 15px;
        border: 0;
        padding: 10px 20px;
        color: grey;
    }
    @media print
    {
      .no_print {
          display: none !important;
      }
    }
</style>
