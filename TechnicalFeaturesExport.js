/* =========================================================
   TECHNICAL FEATURES - EXPORT TO WORD 2016
   ========================================================= */

function exportTechnicalFeaturesToWord() {

    const container =
        document.getElementById(
            "technicalFeaturesComponents"
        );

    if (!container) {

        alert(
            "لم يتم العثور على بيانات المكونات الفنية."
        );

        return;
    }


    const cards =
        container.querySelectorAll(
            ".technical-component-card"
        );

    if (!cards.length) {

        alert(
            "لا توجد بيانات فنية للتصدير."
        );

        return;
    }


    /*
     * نسخ المحتوى حتى لا نؤثر على الصفحة الأصلية
     */
    const exportContainer =
        container.cloneNode(true);


    /* =====================================================
       تحويل الحقول التفاعلية إلى نصوص
       ===================================================== */

    exportContainer
        .querySelectorAll(
            "input, select, textarea"
        )
        .forEach(
            input => {

                let value = "";


                /*
                 * Checkbox
                 */
                if (
                    input.type === "checkbox"
                ) {

                    value =
                        input.checked
                            ? "✓"
                            : "✗";
                }


                /*
                 * Select
                 */
                else if (
                    input.tagName === "SELECT"
                ) {

                    const option =
                        input.options[
                            input.selectedIndex
                        ];

                    value =
                        option
                            ? option.textContent
                            : "";
                }


                /*
                 * Input / Textarea
                 */
                else {

                    value =
                        input.value || "";
                }


                const span =
                    document.createElement(
                        "span"
                    );

                span.className =
                    "word-field-value";

                span.textContent =
                    value;


                input.parentNode.replaceChild(
                    span,
                    input
                );
            }
        );


    /* =====================================================
       حذف العناصر التفاعلية
       ===================================================== */

    exportContainer
        .querySelectorAll(

            ".technical-delete-row, " +

            ".technical-add-row-actions, " +

            ".technical-save-actions, " +

            ".technical-attachment-input, " +

            ".technical-print-actions, " +

            ".technical-word-actions"

        )
        .forEach(
            element => {

                element.remove();

            }
        );


    /* =====================================================
       حذف عمود "حذف"
       ===================================================== */

    exportContainer
        .querySelectorAll(
            ".technical-table"
        )
        .forEach(
            table => {

                const rows =
                    table.querySelectorAll(
                        "tr"
                    );


                rows.forEach(
                    row => {

                        const cells =
                            row.querySelectorAll(
                                "th, td"
                            );


                        if (
                            cells.length
                        ) {

                            cells[
                                cells.length - 1
                            ].remove();

                        }

                    }
                );

            }
        );


    /* =====================================================
       تحويل الصور إلى Base64
       ===================================================== */

    const images =
        exportContainer.querySelectorAll(
            "img"
        );


    /*
     * ملف Word يجب أن يحتوي على الصور
     * نفسها وليس مجرد روابط خارجية.
     *
     * لذلك نحاول التأكد أن الصور
     * الموجودة في الصفحة Data URL.
     */

    images.forEach(
        image => {

            /*
             * لو الصورة بالفعل Base64
             * لا نحتاج أي تعديل.
             */
            if (
                image.src &&
                image.src.startsWith(
                    "data:image/"
                )
            ) {

                return;
            }


            /*
             * الصور المحلية أو الصور المحملة
             * من الصفحة يتم نسخ src الخاص بها.
             */
            if (
                image.src
            ) {

                image.setAttribute(
                    "src",
                    image.src
                );
            }

        }
    );


    /* =====================================================
       إنشاء HTML الخاص بـ Word
       ===================================================== */

    const wordHTML = `

<!DOCTYPE html>

<html
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:w="urn:schemas-microsoft-com:office:word"
    xmlns="http://www.w3.org/TR/REC-html40"
    lang="ar"
    dir="rtl"
>

<head>

    <meta
        charset="UTF-8"
    >

    <meta
        http-equiv="Content-Type"
        content="text/html; charset=UTF-8"
    >

    <title>
        المواصفات الفنية
    </title>


    <style>

        @page {

            size:
                29.7cm 21cm;

            margin:
                1.2cm;

        }


        * {

            box-sizing:
                border-box;

        }


        html,
        body {

            direction:
                rtl;

            font-family:
                Arial,
                Tahoma,
                sans-serif;

            background:
                #ffffff;

            color:
                #111111;

            margin:
                0;

            padding:
                0;

        }


        body {

            font-size:
                10pt;

            direction:
                rtl;

            text-align:
                right;

        }


        /* =================================================
           REPORT HEADER
           ================================================= */

        .word-report-header {

            text-align:
                center;

            margin-bottom:
                25px;

            padding-bottom:
                12px;

            border-bottom:
                3px solid #1e3a5f;

        }


        .word-report-title {

            font-size:
                22pt;

            font-weight:
                bold;

            color:
                #1e3a5f;

            margin-bottom:
                5px;

        }


        .word-report-date {

            font-size:
                9pt;

            color:
                #666666;

        }


        /* =================================================
           COMPONENT
           ================================================= */

        .technical-component-card {

            width:
                100%;

            margin-bottom:
                25px;

        }


        .technical-component-header {

            background:
                #1e3a5f;

            color:
                #ffffff;

            padding:
                8px 12px;

            margin-bottom:
                10px;

            border:
                1px solid #1e3a5f;

        }


        .technical-component-title {

            margin:
                0;

            color:
                #ffffff;

            font-size:
                15pt;

            font-weight:
                bold;

        }


        /* =================================================
           SUBTITLE
           ================================================= */

        .technical-subtitle {

            font-size:
                12pt;

            font-weight:
                bold;

            color:
                #1e3a5f;

            margin:
                15px 0 8px 0;

            padding-bottom:
                4px;

            border-bottom:
                1px solid #bbbbbb;

        }


        /* =================================================
           TABLE
           ================================================= */

        .technical-table-wrapper {

            width:
                100%;

            overflow:
                visible;

        }


        .technical-table {

            width:
                100%;

            border-collapse:
                collapse;

            table-layout:
                auto;

            margin-bottom:
                12px;

            direction:
                rtl;

        }


        .technical-table th {

            background:
                #e8eef5;

            color:
                #111111;

            font-weight:
                bold;

            text-align:
                center;

            vertical-align:
                middle;

            border:
                1px solid #666666;

            padding:
                6px;

        }


        .technical-table td {

            border:
                1px solid #888888;

            padding:
                6px;

            text-align:
                center;

            vertical-align:
                middle;

            word-wrap:
                break-word;

            word-break:
                break-word;

        }


        /* =================================================
           FORM GRID
           ================================================= */

        .technical-form-grid {

            width:
                100%;

            display:
                table;

            border-collapse:
                separate;

            border-spacing:
                8px;

        }


        .technical-field {

            border:
                1px solid #cccccc;

            padding:
                8px;

            background:
                #fafafa;

        }


        .technical-field label {

            display:
                block;

            font-weight:
                bold;

            margin-bottom:
                4px;

            color:
                #333333;

        }


        .word-field-value {

            display:
                inline-block;

            min-width:
                25px;

            color:
                #111111;

        }


        /* =================================================
           CHECKBOXES
           ================================================= */

        .technical-checkbox-grid {

            display:
                table;

            width:
                100%;

            border-spacing:
                5px;

            margin-bottom:
                10px;

        }


        .technical-checkbox {

            border:
                1px solid #cccccc;

            padding:
                6px;

            background:
                #fafafa;

        }


        .technical-checkbox input {

            display:
                none;

        }


        /* =================================================
           ATTACHMENTS
           ================================================= */

        .technical-attachments {

            margin-top:
                15px;

            page-break-inside:
                avoid;

        }


        .technical-attachments-list {

            width:
                100%;

        }


        .technical-attachment-item {

            border:
                1px solid #cccccc;

            padding:
                8px;

            margin-bottom:
                10px;

            page-break-inside:
                avoid;

        }


        .technical-attachment-item img {

            max-width:
                650px;

            max-height:
                700px;

            width:
                auto;

            height:
                auto;

            display:
                block;

            margin:
                5px auto;

        }


        /* =================================================
           PRINT / WORD
           ================================================= */

        .technical-component-card {

            page-break-inside:
                avoid;

        }


        .technical-table tr {

            page-break-inside:
                avoid;

        }


        .technical-table thead {

            display:
                table-header-group;

        }

    </style>

</head>


<body>

    <div class="word-report-header">

        <div class="word-report-title">

            المواصفات الفنية

        </div>


        <div class="word-report-date">

            تاريخ التصدير:
            ${new Date().toLocaleDateString("ar-EG")}

        </div>

    </div>


    <div id="technicalWordContent">

        ${exportContainer.innerHTML}

    </div>

</body>

</html>

    `;


    /* =====================================================
       إنشاء ملف Word
       ===================================================== */

    const blob =
        new Blob(
            [
                "\ufeff",
                wordHTML
            ],
            {
                type:
                    "application/msword;charset=utf-8"
            }
        );


    /* =====================================================
       اسم الملف
       ===================================================== */

    const now =
        new Date();


    const fileName =
        "Technical_Features_" +

        now.getFullYear() +

        "-" +

        String(
            now.getMonth() + 1
        ).padStart(2, "0") +

        "-" +

        String(
            now.getDate()
        ).padStart(2, "0") +

        ".doc";


    /* =====================================================
       تنزيل الملف
       ===================================================== */

    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;

    link.download =
        fileName;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    setTimeout(
        function () {

            URL.revokeObjectURL(
                url
            );

        },
        1000
    );


    alert(
        "Exported successfully."
    );
}


/* =========================================================
   ADD WORD EXPORT BUTTON
   ========================================================= */

function createTechnicalWordButton() {

    const container =
        document.getElementById(
            "technicalFeaturesComponents"
        );

    if (!container) {
        return;
    }


    /*
     * منع إنشاء الزر أكثر من مرة
     */
    if (
        document.getElementById(
            "technicalWordActions"
        )
    ) {

        return;
    }


    const actions =
        document.createElement(
            "div"
        );


    actions.id =
        "technicalWordActions";

    actions.className =
        "technical-word-actions";


    const wordButton =
        document.createElement(
            "button"
        );


    wordButton.type =
        "button";


    wordButton.className = "technical-word-button";
    
    wordButton.innerHTML =
        `<img
        src="https://e7.pngegg.com/pngimages/854/300/png-clipart-microsoft-word-microsoft-office-2016-microsoft-excel-microsoft-template-blue-thumbnail.png"
        alt="Export to Word"
        title="Export to Word"
         />`;


    wordButton.addEventListener(
        "click",
        exportTechnicalFeaturesToWord
    );


    actions.appendChild(
        wordButton
    );


    /*
     * وضع الزر بجوار/قبل زر الطباعة
     */
    const printActions =
        document.getElementById(
            "technicalPrintActions"
        );


    if (printActions) {

        printActions.parentNode.insertBefore(
            actions,
            printActions.nextSibling
        );

    } else {

        container.parentNode.insertBefore(
            actions,
            container
        );

    }

}


/* =========================================================
   WORD BUTTON INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        createTechnicalWordButton();

    }
);
