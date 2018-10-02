<style>
    /*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}template{display:none}[hidden]{display:none}/*# sourceMappingURL=normalize.min.css.map */

    @page {
        margin: 0
    }

    body {
        margin: 0
    }

    .sheet {
        margin: 0;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        page-break-after: always;
    }

    /** Paper sizes **/
    body.A3           .sheet { width: 297mm; height: 419mm }
    body.A3.landscape .sheet { width: 420mm; height: 296mm }
    body.A4           .sheet { width: 210mm; height: 296mm }
    body.A4.landscape .sheet { width: 297mm; height: 209mm }
    body.A5           .sheet { width: 148mm; height: 209mm }
    body.A5.landscape .sheet { width: 210mm; height: 147mm }

    /** Padding area **/
    .sheet.padding-10mm { padding: 10mm }
    .sheet.padding-15mm { padding: 15mm }
    .sheet.padding-20mm { padding: 20mm }
    .sheet.padding-25mm { padding: 25mm }

    /** For screen preview **/
    @media screen {
        body {
            background-color: #333;
        }
        .sheet {
            background: white;
            box-shadow: 0 .5mm 2mm rgba(0,0,0,.3);
            margin: 0.5cm auto;
        }
    }

    /** Fix for Chrome issue #273306 **/
    @media print {
               body.A3.landscape { width: 420mm }
      body.A3, body.A4.landscape { width: 297mm }
      body.A4, body.A5.landscape { width: 210mm }
      body.A5                    { width: 148mm }
      body { background: white }
    }

    @page {
        size: A4 landscape;
    }

    body {
      font-family: 'Helvetica', sans-serif;
      font-size: 8px;
      color: black;
      font-size: 1rem;
    }

    .text-right {
        text-align: right;
    }

    .header-elements {
        position: relative;
        width: 100%;
        height: 6.5cm;
        border-bottom: 2px #CCC solid;
    }

        .logo {
            position: absolute;
            float: left;
            top: 0.5cm;
            left: 0.5cm;
        }

        .estimate {
            position: absolute;
            font-size: 1.5rem;
            float: right;
            top: 0.5cm;
            right: 0.5cm;
        }

        .address {
            position: absolute;
            float: right;
            top: 2cm;
            right: 0.5cm;
        }

    .estimate-info {
        position: relative;
        width: 100%;
        height: 5.5cm;
    }

        .billing-address {
            position: absolute;
            float: left;
            top: 0.5cm;
            left: 1cm;
        }

        .estimate-details {
            position: absolute;
            float: right;
            top: 0.5cm;
            right: 1cm;
        }

        .estimate-info table {
            min-width: 8cm;
            border-spacing: 0;
        }

        .estimate-info table td {
            padding: 0.25cm 0.2cm;
        }

        .estimate-info table .header {
            font-weight: 800;
        }

        .estimate-info table .total {
            background-color: #EEE;
        }

    .items-list {
        position: relative;
        width: 100%;
        height: 10cm;
        font-size: 0.8rem;
        border-bottom: 2px #CCC solid;
    }

        .items-list table {
            width: 100%;
            border: 0;
            border-spacing: 0;
        }

        .items-list table td {
            padding: 0cm 1cm;
        }

        .items-list .header td {
            background-color: #b6cf52;
            font-weight: 800;
            padding: 0.5cm 1cm;
        }

    .items-totals {
        position: relative;
        width: 100%;
    }

        .totals {
            position: absolute;
            float: right;
            top: 0.5cm;
            right: 1cm;
            width: 8cm;
        }

        .items-totals table {
            min-width: 8cm;
            border-spacing: 0;
        }

        .items-totals table td {
            padding: 0.25cm 0.2cm;
        }

        .items-totals table .header {
            font-weight: 800;
        }

        .items-totals table .total td {
            border-top: 2px solid #EEE;
            border-bottom: 2px solid #EEE;
        }

    .ui-box {
      float: right;
      position: absolute;
      z-index: 999;
      right: 10px;
      bottom: 10px;
      width: auto;
      height: auto;
      background-color: white;
      padding: 20px;
      font-size: 12px;
    }

    @media screen {
        .noprint {
          display: block;
        }
    }

    @media print {
      body,
      .A4 {
        margin: 0;
        -webkit-box-shadow: 0;
                box-shadow: 0;
        width: 100%;
        height: 100%;
      }

      .noprint {
        display: none;
      }
    }


</style>
