/* =========================================================
   TECHNICAL FEATURES - FINAL VERSION
   ========================================================= */              
/* =========================================================
   GLOBAL DATA
   ========================================================= */
const technicalFeaturesData =
    window.technicalFeaturesData = window.technicalFeaturesData || {};
/* =========================================================
   COMPONENT DEFINITIONS
   ========================================================= */
const technicalComponentDefinitions = {
    "المأخذ": {
        title: "المأخذ",
        render: renderIntakeTechnicalFeatures
    },

    "بيارة العكرة": {
        title: "بيارة العكرة",
        render: renderRawWaterSumpTechnicalFeatures
    },

    "بئر التوزيع": {
        title: "بئر التوزيع",
        render: renderDistributionWellTechnicalFeatures
    },

    "عنبر طلمبات العكرة": {
        title: "عنبر طلمبات العكرة",
        render: renderRawWaterPumpRoomTechnicalFeatures
    },

    "عنبر الطلمبات العكرة": {
        title: "عنبر طلمبات العكرة",
        render: renderRawWaterPumpRoomTechnicalFeatures
    },

    "عنبر طلمبات المرشحة": {
        title: "عنبر طلمبات المرشحة",
        render: renderFilteredWaterPumpRoomTechnicalFeatures
    },

    "عنبر الطلمبات المرشحة": {
        title: "عنبر طلمبات المرشحة",
        render: renderFilteredWaterPumpRoomTechnicalFeatures
    },

    "عنبر طلمبات المياه العكرة والمرشحة": {
        title: "عنبر طلمبات المياه العكرة والمرشحة",
        render: renderRawAndFilteredPumpRoomTechnicalFeatures
    },

    "عنبر الطلمبات العكرة والمرشحة": {
        title: "عنبر طلمبات المياه العكرة والمرشحة",
        render: renderRawAndFilteredPumpRoomTechnicalFeatures
    },

    "منظومة الكلور": {
        title: "منظومة الكلور",
        render: renderChlorineRoomTechnicalFeatures
    },

    "عنبر الكلور": {
        title: "عنبر الكلور",
        render: renderChlorineRoomTechnicalFeatures
    },

    "منظومة الشبة": {
        title: "منظومة الشبة",
        render: renderAlumTechnicalFeatures
    },

    "المروقات": {
        title: "المروقات",
        render: renderClarifiersTechnicalFeatures
    },

    "احواض الترسيب": {
        title: "أحواض الترسيب",
        render: renderSedimentationBasinsTechnicalFeatures
    },

    "أحواض الترسيب": {
        title: "أحواض الترسيب",
        render: renderSedimentationBasinsTechnicalFeatures
    },

    "منظومة التعامل مع تسريب الكلور": {
        title: "منظومة التعامل مع تسريب الكلور",
        render: renderChlorineLeakTechnicalFeatures
    },

    "منظومة الروبة": {
        title: "منظومة الروبة",
        render: renderSludgeTechnicalFeatures
    },

    "المرشحات": {
        title: "المرشحات",
        render: renderFiltersTechnicalFeatures
    },

    "منظومة CEB": {
        title: "منظومة CEB",
        render: renderCEBTechnicalFeatures
    },

    "منظومة CIP": {
        title: "منظومة CIP",
        render: renderCIPTechnicalFeatures
    },

    "الخزانات": {
        title: "الخزانات",
        render: renderTanksTechnicalFeatures
    },

    "اجهزة القياس والتصرف": {
        title: "أجهزة القياس والتصرف",
        render: renderFlowMetersTechnicalFeatures
    },

    "أجهزة القياس والتصرف": {
        title: "أجهزة القياس والتصرف",
        render: renderFlowMetersTechnicalFeatures
    },

    "عنبر المحول الكهربائى": {
        title: "عنبر المحول الكهربائى",
        render: renderTransformerRoomTechnicalFeatures
    },

    "عنبر المولد الكهربائى": {
        title: "عنبر المولد الكهربائى",
        render: renderGeneratorRoomTechnicalFeatures
    }
};
/* =========================================================
   COMPONENT ALIASES
   ========================================================= */
const technicalComponentAliases = {

    "عنبر الطلمبات العكرة":
        "عنبر طلمبات العكرة",

    "عنبر الطلمبات المرشحة":
        "عنبر طلمبات المرشحة",

    "عنبر الطلمبات العكرة والمرشحة":
        "عنبر طلمبات المياه العكرة والمرشحة",

    "منظومة الكلور":
        "عنبر الكلور",

    "احواض الترسيب":
        "أحواض الترسيب",

    "اجهزة القياس والتصرف":
        "أجهزة القياس والتصرف"
};
/* =========================================================
   GET CANONICAL COMPONENT NAME
   ========================================================= */
function getCanonicalTechnicalComponent(component) {
    return technicalComponentAliases[component] ||
        component;
}
/* =========================================================
   ULTRAFILTRATION CHECK
   ========================================================= */
function isUltrafiltrationSystem() {

    const typeElement =
        document.getElementById("type");

    if (!typeElement) {
        return false;
    }

    const type =
        String(typeElement.value || "");

    const types =
        type
            .split("+")
            .map(value => value.trim())
            .filter(Boolean);

    return types.includes("ترشيح فائق");
}
/* =========================================================
   UPDATE TECHNICAL FEATURES
   ========================================================= */

function updateTechnicalFeatures() {

    const container =
        document.getElementById(
            "technicalFeaturesComponents"
        );

    const emptyState =
        document.getElementById(
            "technicalFeaturesEmpty"
        );

    if (!container) {
        return;
    }

    const selectedComponents = [];

    document
        .querySelectorAll(
            '#componentsGrid input[type="checkbox"]:checked'
        )
        .forEach(checkbox => {

            const value =
                String(checkbox.value || "").trim();

            if (value) {
                selectedComponents.push(value);
            }
        });

    container.innerHTML = "";

    if (selectedComponents.length === 0) {

        if (emptyState) {
            emptyState.style.display = "flex";
        }

        return;
    }

    if (emptyState) {
        emptyState.style.display = "none";
    }

  

    selectedComponents.forEach(component => {

        

        const definition =
            technicalComponentDefinitions[component];

        if (!definition) {

            console.warn(
                "No Technical Features definition for:",
                component
            );

            return;
        }

        const card =
            document.createElement("div");

        card.className =
            "technical-component-card";

        card.dataset.component =
            component;

        const header =
            document.createElement("div");

        header.className =
            "technical-component-header";

        const title =
            document.createElement("h4");

        title.className =
            "technical-component-title";

        title.textContent =
            definition.title;

        header.appendChild(title);

        const body =
            document.createElement("div");

        body.className =
            "technical-component-body";

        const canonicalComponent =
            getCanonicalTechnicalComponent(
                component
            );

        const savedData =
            technicalFeaturesData[component] ||
            technicalFeaturesData[canonicalComponent] ||
            null;

        definition.render(
            body,
            savedData
        );

        card.appendChild(header);
        card.appendChild(body);

        container.appendChild(card);
    });
}


/* =========================================================
   CREATE TECHNICAL TABLE
   ========================================================= */

function createTechnicalTable(
    container,
    options
) {

    const section =
        document.createElement("div");

    section.className =
        "technical-table-section";

    if (options.title) {

        const title =
            document.createElement("div");

        title.className =
            "technical-subtitle";

        title.textContent =
            options.title;

        section.appendChild(title);
    }

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "technical-table-wrapper";

    const table =
        document.createElement("table");

    table.className =
        "technical-table";

    const thead =
        document.createElement("thead");

    const headerRow =
        document.createElement("tr");

    (options.columns || []).forEach(column => {

        const th =
            document.createElement("th");

        th.textContent =
            column.label || "";

        headerRow.appendChild(th);
    });

    const deleteTh =
        document.createElement("th");

    deleteTh.textContent =
        "حذف";

    headerRow.appendChild(deleteTh);

    thead.appendChild(headerRow);

    const tbody =
        document.createElement("tbody");

    table.appendChild(thead);
    table.appendChild(tbody);

    wrapper.appendChild(table);
    section.appendChild(wrapper);

    container.appendChild(section);

    const rows =
        Array.isArray(options.data)
            ? options.data
            : [];

    if (rows.length > 0) {

        rows.forEach(rowData => {

            addTechnicalTableRow(
                tbody,
                options.columns,
                rowData
            );
        });

    } else {

        addTechnicalTableRow(
            tbody,
            options.columns
        );
    }

    if (options.addRow !== false) {

        const addActions =
            document.createElement("div");

        addActions.className =
            "technical-add-row-actions";

        const addButton =
            document.createElement("button");

        addButton.type =
            "button";

        addButton.className =
            "technical-add-row-button";

        addButton.textContent =
            "+ إضافة صف";

        addButton.addEventListener(
            "click",
            function () {

                addTechnicalTableRow(
                    tbody,
                    options.columns
                );
            }
        );

        addActions.appendChild(addButton);

        section.appendChild(addActions);
    }

    return tbody;
}


/* =========================================================
   ADD TABLE ROW
   ========================================================= */

function addTechnicalTableRow(
    tbody,
    columns,
    savedData = {}
) {

    const row =
        document.createElement("tr");

    (columns || []).forEach(column => {

        const cell =
            document.createElement("td");

        let input;

        /* =================================================
           STATIC
           ================================================= */

        if (column.type === "static") {

            const staticValue =
                document.createElement("span");

            staticValue.className =
                "technical-static-value";

            staticValue.textContent =
                savedData[column.key] ??
                column.defaultValue ??
                "";

            cell.appendChild(
                staticValue
            );

            row.appendChild(cell);

            return;
        }


        /* =================================================
           SELECT
           ================================================= */

        if (column.type === "select") {

            input =
                document.createElement("select");

            const emptyOption =
                document.createElement("option");

            emptyOption.value = "";
            emptyOption.textContent = "Select";

            input.appendChild(
                emptyOption
            );

            (column.options || [])
                .forEach(option => {

                    const opt =
                        document.createElement("option");

                    if (
                        typeof option === "object" &&
                        option !== null
                    ) {

                        opt.value =
                            option.value ?? "";

                        opt.textContent =
                            option.label ??
                            option.value ??
                            "";

                    } else {

                        opt.value =
                            String(option);

                        opt.textContent =
                            String(option);
                    }

                    input.appendChild(opt);
                });
        }


        /* =================================================
           TEXTAREA
           ================================================= */

        else if (
            column.type === "textarea"
        ) {

            input =
                document.createElement(
                    "textarea"
                );
        }


        /* =================================================
           INPUT
           ================================================= */

        else {

            input =
                document.createElement("input");

            input.type =
                column.type || "text";
        }


        /* =================================================
           NUMBER SETTINGS
           ================================================= */

        if (column.type === "number") {

            input.min =
                column.min ?? "0";

            input.step =
                column.step ?? "any";
        }


        /* =================================================
           CHECKBOX
           ================================================= */

        if (column.type === "checkbox") {

            input.checked =
                Boolean(
                    savedData[column.key]
                );

        } else {

            input.value =
                savedData[column.key] ?? "";
        }


        input.dataset.key =
            column.key;


        cell.appendChild(input);

        row.appendChild(cell);
    });


    /* =====================================================
       DELETE
       ===================================================== */

    const deleteCell =
        document.createElement("td");

    const deleteButton =
        document.createElement("button");

    deleteButton.type =
        "button";

    deleteButton.className =
        "technical-delete-row";

    deleteButton.textContent =
        "🗑";

    deleteButton.addEventListener(
        "click",
        function () {

            row.remove();

            /*
             * لا نضيف صفًا جديدًا تلقائيًا هنا.
             * عند الحفظ سيتم اعتبار الجدول فارغًا.
             */
        }
    );

    deleteCell.appendChild(
        deleteButton
    );

    row.appendChild(
        deleteCell
    );

    tbody.appendChild(row);
}


/* =========================================================
   CHECK WHETHER A TABLE ROW IS EMPTY
   ========================================================= */

function isTechnicalRowEmpty(row) {

    const inputs =
        row.querySelectorAll(
            "input[data-key], select[data-key], textarea[data-key]"
        );

    if (!inputs.length) {
        return true;
    }

    return Array.from(inputs)
        .every(input => {

            if (input.type === "checkbox") {
                return !input.checked;
            }

            return String(
                input.value ?? ""
            ).trim() === "";
        });
}


/* =========================================================
   COLLECT GENERIC TABLE
   ========================================================= */

function collectTechnicalTableData(
    card,
    tableIndex = 0
) {

    const tables =
        card.querySelectorAll(
            ".technical-table"
        );

    const table =
        tables[tableIndex];

    if (!table) {
        return [];
    }

    const result = [];

    table
        .querySelectorAll("tbody tr")
        .forEach(row => {

            /*
             * تجاهل الصف الفارغ بالكامل.
             */
            if (isTechnicalRowEmpty(row)) {
                return;
            }

            const rowData = {};

            row
                .querySelectorAll(
                    "input[data-key], select[data-key], textarea[data-key]"
                )
                .forEach(input => {

                    const key =
                        input.dataset.key;

                    if (!key) {
                        return;
                    }

                    if (
                        input.type === "checkbox"
                    ) {

                        rowData[key] =
                            input.checked;

                    } else if (
                        input.type === "number"
                    ) {

                        rowData[key] =
                            input.value === ""
                                ? ""
                                : Number(
                                    input.value
                                );

                    } else {

                        rowData[key] =
                            String(
                                input.value ?? ""
                            ).trim();
                    }
                });

            result.push(rowData);
        });

    return result;
}


/* =========================================================
   SAVE BUTTON
   ========================================================= */

function createTechnicalSaveButton(
    container,
    component
) {

    const actions =
        document.createElement("div");

    actions.className =
        "technical-save-actions";

    const button =
        document.createElement("button");

    button.type =
        "button";

    button.className =
        "technical-save-button";

    button.textContent =
        "حفظ البيانات";

    button.addEventListener(
        "click",
        function () {

            saveTechnicalComponent(
                component
            );
        }
    );

    actions.appendChild(button);

    container.appendChild(actions);
}


/* =========================================================
   ATTACHMENTS
   ========================================================= */

function createTechnicalAttachments(
    container,
    component,
    savedFiles = []
) {

    const section =
        document.createElement("div");

    section.className =
        "technical-attachments";

    const title =
        document.createElement("div");

    title.className =
        "technical-subtitle";

    title.textContent =
        "المرفقات والصور";

    section.appendChild(title);

    const input =
        document.createElement("input");

    input.type =
        "file";

    input.multiple =
        true;

    input.accept =
        "image/*,.pdf,.doc,.docx,.xls,.xlsx";

    input.className =
        "technical-attachment-input";

    const list =
        document.createElement("div");

    list.className =
        "technical-attachments-list";

    section.appendChild(input);
    section.appendChild(list);

    const filesData =
        Array.isArray(savedFiles)
            ? [...savedFiles]
            : [];

    function renderFiles() {

        list.innerHTML = "";

        filesData.forEach(
            (file, index) => {

                const item =
                    document.createElement("div");

                item.className =
                    "technical-attachment-item";

                const name =
                    document.createElement("span");

                name.textContent =
                    file.name || "مرفق";

                const remove =
                    document.createElement("button");

                remove.type =
                    "button";

                remove.textContent =
                    "حذف";

                remove.addEventListener(
                    "click",
                    function () {

                        filesData.splice(
                            index,
                            1
                        );

                        renderFiles();
                    }
                );

                item.appendChild(name);
                item.appendChild(remove);

                list.appendChild(item);
            }
        );
    }

    input.addEventListener(
        "change",
        function () {

            const files =
                Array.from(
                    this.files || []
                );

            files.forEach(file => {

                const reader =
                    new FileReader();

                reader.onload =
                    function (event) {

                        filesData.push({

                            name:
                                file.name,

                            type:
                                file.type,

                            size:
                                file.size,

                            data:
                                event.target.result
                        });

                        renderFiles();
                    };

                reader.onerror =
                    function () {

                        console.error(
                            "Error reading file:",
                            file.name
                        );
                    };

                reader.readAsDataURL(file);
            });

            /*
             * السماح باختيار نفس الملف مرة أخرى.
             */
            this.value = "";
        }
    );

    renderFiles();

    container.appendChild(section);

    return function () {
        return [...filesData];
    };
}


/* =========================================================
   RAW WATER SUMP
   ========================================================= */

function renderRawWaterSumpTechnicalFeatures(
    container,
    savedData = null
) {

    const data =
        savedData || {
            rows: [],
            attachments: []
        };

    createTechnicalTable(
        container,
        {
            title: "بيارة العكرة",

            columns: [

                {
                    key: "type",
                    label: "النوع",
                    type: "text"
                },

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    step: "1"
                },

                {
                    key: "volume",
                    label: "الحجم",
                    type: "number"
                },

                {
                    key: "disinfection",
                    label: "طريقة التطهير",
                    type: "text"
                }
            ],

            data: data.rows,
            addRow: true
        }
    );

    const getAttachments =
        createTechnicalAttachments(
            container,
            "بيارة العكرة",
            data.attachments
        );

    container._getAttachments =
        getAttachments;

    createTechnicalSaveButton(
        container,
        "بيارة العكرة"
    );
}


/* =========================================================
   DISTRIBUTION WELL
   ========================================================= */

function renderDistributionWellTechnicalFeatures(
    container,
    savedData = null
) {

    const data =
        savedData || {
            rows: [],
            attachments: []
        };

    createTechnicalTable(
        container,
        {
            title: "بئر التوزيع",

            columns: [

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    step: "1"
                },

                {
                    key: "volume",
                    label: "الحجم",
                    type: "number"
                },

                {
                    key: "disinfection",
                    label: "طريقة التطهير",
                    type: "text"
                }
            ],

            data: data.rows,
            addRow: true
        }
    );

    const getAttachments =
        createTechnicalAttachments(
            container,
            "بئر التوزيع",
            data.attachments
        );

    container._getAttachments =
        getAttachments;

    createTechnicalSaveButton(
        container,
        "بئر التوزيع"
    );
}


/* =========================================================
   PUMP ROOM GENERIC
   ========================================================= */

function renderPumpRoomTechnicalFeatures(
    container,
    savedData = null,
    componentName = ""
) {

    const data =
        savedData || {
            pumps: [],
            attachments: []
        };

    createTechnicalTable(
        container,
        {
            title:
                "الطلمبات والمحركات الكهربائية",

            columns: [

                {
                    key: "stage",
                    label: "المرحلة",
                    type: "text"
                },

                {
                    key: "type",
                    label: "الصنف",
                    type: "select",
                    options: [
                        "طلمبات",
                        "محركات كهربائية"
                    ]
                },

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    step: "1"
                },

                {
                    key: "basic",
                    label: "أساسى",
                    type: "number",
                    step: "1"
                },

                {
                    key: "spare",
                    label: "احتياطي",
                    type: "number",
                    step: "1"
                },

                {
                    key: "designFlow",
                    label: "التصرف التصميمي (ل/ث)",
                    type: "number"
                },

                {
                    key: "power",
                    label: "القدرة",
                    type: "number"
                },

                {
                    key: "head",
                    label: "الرفع (م)",
                    type: "number"
                },

                {
                    key: "rpm",
                    label: "عدد اللفات (لفة/دقيقة)",
                    type: "number"
                },

                {
                    key: "capacity",
                    label: "السعة",
                    type: "number"
                },

                {
                    key: "country",
                    label: "بلد الصنع",
                    type: "text"
                }
            ],

            data: data.pumps,
            addRow: true
        }
    );

    const getAttachments =
        createTechnicalAttachments(
            container,
            componentName,
            data.attachments
        );

    container._getAttachments =
        getAttachments;

    createTechnicalSaveButton(
        container,
        componentName
    );
}


/* =========================================================
   RAW WATER PUMP ROOM
   ========================================================= */

function renderRawWaterPumpRoomTechnicalFeatures(
    container,
    savedData = null
) {

    renderPumpRoomTechnicalFeatures(
        container,
        savedData,
        "عنبر طلمبات العكرة"
    );
}


/* =========================================================
   FILTERED WATER PUMP ROOM
   ========================================================= */

function renderFilteredWaterPumpRoomTechnicalFeatures(
    container,
    savedData = null
) {

    renderPumpRoomTechnicalFeatures(
        container,
        savedData,
        "عنبر طلمبات المرشحة"
    );
}


/* =========================================================
   RAW + FILTERED
   ========================================================= */

function renderRawAndFilteredPumpRoomTechnicalFeatures(
    container,
    savedData = null
) {

    renderPumpRoomTechnicalFeatures(
        container,
        savedData,
        "عنبر طلمبات المياه العكرة والمرشحة"
    );
}


/* =========================================================
   CLARIFIERS
   ========================================================= */

function renderClarifiersTechnicalFeatures(
    container,
    savedData = null
) {

    const data =
        savedData || {

            clarifiers: [],
            rapidMixers: [],
            slowMixers: [],
            bridges: [],
            attachments: []
        };


    createTechnicalTable(
        container,
        {
            title: "المروقات",

            columns: [

                {
                    key: "stage",
                    label: "المرحلة",
                    type: "text"
                },

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "basic",
                    label: "الأساسي",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "spare",
                    label: "الاحتياطي",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "shape",
                    label: "الشكل",
                    type: "text"
                },

                {
                    key: "clarifierVolume",
                    label: "حجم المروق الواحد",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "surfaceLoading",
                    label: "الحمل السطحي",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "detentionTime",
                    label: "زمن مكث المياه",
                    type: "number",
                    min: 0,
                    step: "any"
                }
            ],

            data: data.clarifiers,
            addRow: true
        }
    );


    createTechnicalTable(
        container,
        {
            title: "القلابات السريعة",

            columns: [

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "basic",
                    label: "أساسى",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "spare",
                    label: "احتياطي",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "power",
                    label: "القدرة",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "rpm",
                    label: "عدد اللفات (لفة/دقيقة)",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "country",
                    label: "بلد الصنع",
                    type: "text"
                },

                {
                    key: "condition",
                    label: "الحالة",
                    type: "text"
                }
            ],

            data: data.rapidMixers,
            addRow: true
        }
    );


    createTechnicalTable(
        container,
        {
            title: "القلابات البطيئة",

            columns: [

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "basic",
                    label: "أساسى",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "spare",
                    label: "احتياطي",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "power",
                    label: "القدرة",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "rpm",
                    label: "عدد اللفات (لفة/دقيقة)",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "country",
                    label: "بلد الصنع",
                    type: "text"
                },

                {
                    key: "condition",
                    label: "الحالة",
                    type: "text"
                }
            ],

            data: data.slowMixers,
            addRow: true
        }
    );


    createTechnicalTable(
        container,
        {
            title: "كباري المروقات",

            columns: [

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "power",
                    label: "القدرة",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "country",
                    label: "بلد الصنع",
                    type: "text"
                },

                {
                    key: "condition",
                    label: "الحالة",
                    type: "text"
                }
            ],

            data: data.bridges,
            addRow: true
        }
    );


    const getAttachments =
        createTechnicalAttachments(
            container,
            "المروقات",
            data.attachments
        );

    container._getAttachments =
        getAttachments;

    createTechnicalSaveButton(
        container,
        "المروقات"
    );
}


/* =========================================================
   SEDIMENTATION BASINS
   ========================================================= */

function renderSedimentationBasinsTechnicalFeatures(
    container,
    savedData = null
) {

    const data =
        savedData || {

            basins: [],
            bridges: [],
            attachments: []
        };


    createTechnicalTable(
        container,
        {
            title: "أحواض الترسيب",

            columns: [

                {
                    key: "stage",
                    label: "المرحلة",
                    type: "text"
                },

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "basic",
                    label: "الأساسي",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "spare",
                    label: "الاحتياطي",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "shape",
                    label: "الشكل",
                    type: "text"
                },

                {
                    key: "basinVolume",
                    label: "حجم حوض الترسيب الواحد",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "surfaceLoading",
                    label: "الحمل السطحي",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "detentionTime",
                    label: "زمن مكث المياه",
                    type: "number",
                    min: 0,
                    step: "any"
                }
            ],

            data: data.basins,
            addRow: true
        }
    );


    createTechnicalTable(
        container,
        {
            title: "كباري أحواض الترسيب",

            columns: [

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "power",
                    label: "القدرة",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "country",
                    label: "بلد الصنع",
                    type: "text"
                },

                {
                    key: "condition",
                    label: "الحالة",
                    type: "text"
                }
            ],

            data: data.bridges,
            addRow: true
        }
    );


    const getAttachments =
        createTechnicalAttachments(
            container,
            "أحواض الترسيب",
            data.attachments
        );

    container._getAttachments =
        getAttachments;

    createTechnicalSaveButton(
        container,
        "أحواض الترسيب"
    );
}


/* =========================================================
   CHLORINE LEAK SYSTEM
   ========================================================= */

function renderChlorineLeakTechnicalFeatures(
    container,
    savedData = null
) {

    const data =
        savedData || {

            system: [],
            pumps: [],
            attachments: []
        };


    createTechnicalTable(
        container,
        {
            title:
                "منظومة التعامل مع تسريب الكلور",

            columns: [

                {
                    key: "systemType",
                    label: "نوع المنظومة",
                    type: "select",
                    options: [
                        "برج التعادل",
                        "بئر الإعدام",
                        "كبسولة"
                    ]
                },

                {
                    key: "sodaTankOrDisposalWell",
                    label:
                        "حجم خزان الصودا / حجم بئر الإعدام",
                    type: "text"
                },

                {
                    key: "sodaConcentration",
                    label: "تركيز الصودا",
                    type: "text"
                },

                {
                    key: "tankWellCapsuleCondition",
                    label:
                        "حالة خزان الصودا / بئر الإعدام / كبسولة الإعدام",
                    type: "text"
                },

                {
                    key: "sensorCount",
                    label: "عدد الحساسات",
                    type: "number",
                    step: "1"
                },

                {
                    key: "sensorCondition",
                    label: "حالة الحساسات",
                    type: "text"
                },

                {
                    key: "oxygenDeviceCount",
                    label: "عدد أجهزة الأكسجين",
                    type: "number",
                    step: "1"
                },

                {
                    key: "oxygenDeviceCondition",
                    label: "حالة أجهزة الأكسجين",
                    type: "text"
                },

                {
                    key: "alarmLeakageOperation",
                    label:
                        "طريقة عمل منظومة الإنذار والتسريب",
                    type: "text"
                }
            ],

            data: data.system,
            addRow: true
        }
    );


    createTechnicalTable(
        container,
        {
            title:
                "الطلمبات والمحركات الكهربائية",

            columns: [

                {
                    key: "stage",
                    label: "المرحلة",
                    type: "text"
                },

                {
                    key: "type",
                    label: "الصنف",
                    type: "text"
                },

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    step: "1"
                },

                {
                    key: "basic",
                    label: "أساسى",
                    type: "number",
                    step: "1"
                },

                {
                    key: "spare",
                    label: "احتياطي",
                    type: "number",
                    step: "1"
                },

                {
                    key: "designFlow",
                    label: "التصرف التصميمي (ل/ث)",
                    type: "number"
                },

                {
                    key: "power",
                    label: "القدرة",
                    type: "number"
                },

                {
                    key: "head",
                    label: "الرفع (م)",
                    type: "number"
                },

                {
                    key: "rpm",
                    label: "عدد اللفات (لفة/دقيقة)",
                    type: "number"
                },

                {
                    key: "capacity",
                    label: "السعة",
                    type: "number"
                },

                {
                    key: "country",
                    label: "بلد الصنع",
                    type: "text"
                },

                {
                    key: "condition",
                    label: "الحالة",
                    type: "text"
                }
            ],

            data: data.pumps,
            addRow: true
        }
    );


    const getAttachments =
        createTechnicalAttachments(
            container,
            "منظومة التعامل مع تسريب الكلور",
            data.attachments
        );

    container._getAttachments =
        getAttachments;

    createTechnicalSaveButton(
        container,
        "منظومة التعامل مع تسريب الكلور"
    );
}


/* =========================================================
   CHLORINE ROOM
   ========================================================= */

function renderChlorineRoomTechnicalFeatures(
    container,
    savedData = null
) {

    const data =
        savedData || {

            chlorinePumps: [],
            boosters: [],
            cylinderStore: [],
            attachments: []
        };


    createTechnicalTable(
        container,
        {
            title: "بيانات عنبر الكلور",

            columns: [

                {
                    key: "stage",
                    label: "المرحلة",
                    type: "text"
                },

                {
                    key: "type",
                    label: "النوع",
                    type: "text"
                },

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    step: "1"
                },

                {
                    key: "basic",
                    label: "الأساسي",
                    type: "number",
                    step: "1"
                },

                {
                    key: "spare",
                    label: "الاحتياطي",
                    type: "number",
                    step: "1"
                },

                {
                    key: "brand",
                    label: "الماركة",
                    type: "text"
                },

                {
                    key: "capacity",
                    label: "السعة",
                    type: "number"
                },

                {
                    key: "injectionPoint",
                    label: "مكان الحقن",
                    type: "text"
                },

                {
                    key: "injectionLines",
                    label: "عدد خطوط الحقن",
                    type: "number",
                    step: "1"
                },

                {
                    key: "operation",
                    label: "طريقة التشغيل",
                    type: "text"
                }
            ],

            data: data.chlorinePumps,
            addRow: true
        }
    );


    createTechnicalTable(
        container,
        {
            title: "البوسترات",

            columns: [

                {
                    key: "stage",
                    label: "المرحلة",
                    type: "text"
                },

                {
                    key: "type",
                    label: "الصنف",
                    type: "text"
                },

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    step: "1"
                },

                {
                    key: "basic",
                    label: "أساسي",
                    type: "number",
                    step: "1"
                },

                {
                    key: "spare",
                    label: "احتياطي",
                    type: "number",
                    step: "1"
                },

                {
                    key: "designFlow",
                    label: "التصرف التصميمي (ل/ث)",
                    type: "number"
                },

                {
                    key: "power",
                    label: "القدرة",
                    type: "number"
                },

                {
                    key: "head",
                    label: "الرفع (م)",
                    type: "number"
                },

                {
                    key: "rpm",
                    label: "عدد اللفات (لفة/دقيقة)",
                    type: "number"
                },

                {
                    key: "capacity",
                    label: "السعة",
                    type: "number"
                },

                {
                    key: "country",
                    label: "بلد الصنع",
                    type: "text"
                }
            ],

            data: data.boosters,
            addRow: true
        }
    );


    createTechnicalTable(
        container,
        {
            title: "مخزن اسطوانات الكلور",

            columns: [

                {
                    key: "capacity",
                    label: "السعة",
                    type: "number"
                },

                {
                    key: "basic",
                    label: "الأساسي",
                    type: "number",
                    step: "1"
                },

                {
                    key: "spare",
                    label: "الاحتياطي",
                    type: "number",
                    step: "1"
                },

                {
                    key: "coverageDays",
                    label: "مقدار التغطية لأيام التشغيل",
                    type: "number"
                },

                {
                    key: "ventilation",
                    label: "التهوية",
                    type: "checkbox"
                },

                {
                    key: "scale",
                    label: "الميزان",
                    type: "checkbox"
                },

                {
                    key: "pressureGauge",
                    label: "قياس ضغط الاسطوانات",
                    type: "checkbox"
                },

                {
                    key: "evaporators",
                    label: "المبخرات",
                    type: "checkbox"
                },

                {
                    key: "autoChanger",
                    label: "جهاز تحويل اتوماتيك",
                    type: "checkbox"
                },

                {
                    key: "lines",
                    label: "عدد الخطوط",
                    type: "number",
                    step: "1"
                }
            ],

            data: data.cylinderStore,
            addRow: true
        }
    );


    const getAttachments =
        createTechnicalAttachments(
            container,
            "عنبر الكلور",
            data.attachments
        );

    container._getAttachments =
        getAttachments;

    createTechnicalSaveButton(
        container,
        "عنبر الكلور"
    );
}


/* =========================================================
   SLUDGE
   ========================================================= */

function renderSludgeTechnicalFeatures(
    container,
    savedData = null
) {

    const data =
        savedData || {

            sludge: [],
            pumps: [],
            attachments: []
        };


    createTechnicalTable(
        container,
        {
            title: "الروبة",

            columns: [

                {
                    key: "treatmentType",
                    label: "نوع المعالجة",
                    type: "select",
                    options: [
                        "لايوجد معالجة",
                        "التكثيف",
                        "التجفيف الطبيعى",
                        "التجفيف الميكانيكى"
                    ]
                },

                {
                    key: "disposalMethod",
                    label: "طريقة الصرف",
                    type: "select",
                    options: [
                        "صرف مباشر",
                        "غير مباشر بالتخفيف",
                        "لايوجد صرف"
                    ]
                },

                {
                    key: "sedimentHandling",
                    label: "التعامل مع الرواسب",
                    type: "text"
                },

                {
                    key: "dischargeLocation",
                    label: "مكان صرف الروبة والغسيل",
                    type: "text"
                },

                {
                    key: "dischargeSchedule",
                    label: "مواعيد الصرف",
                    type: "text"
                },

                {
                    key: "wellCount",
                    label: "عدد آبار الروبة",
                    type: "number",
                    step: "1"
                },

                {
                    key: "wellVolume",
                    label: "حجم بئر الروبة",
                    type: "number"
                },

                {
                    key: "condition",
                    label: "الحالة",
                    type: "text"
                }
            ],

            data: data.sludge,
            addRow: false
        }
    );


    createTechnicalTable(
        container,
        {
            title: "طلمبات ومحركات",

            columns: [

                {
                    key: "type",
                    label: "الصنف",
                    type: "text"
                },

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    step: "1"
                },

                {
                    key: "basic",
                    label: "أساسى",
                    type: "number",
                    step: "1"
                },

                {
                    key: "spare",
                    label: "احتياطي",
                    type: "number",
                    step: "1"
                },

                {
                    key: "designFlow",
                    label: "التصرف التصميمي (ل/ث)",
                    type: "number"
                },

                {
                    key: "power",
                    label: "القدرة",
                    type: "number"
                },

                {
                    key: "head",
                    label: "الرفع (م)",
                    type: "number"
                },

                {
                    key: "rpm",
                    label: "عدد اللفات (لفة/دقيقة)",
                    type: "number"
                },

                {
                    key: "capacity",
                    label: "السعة",
                    type: "number"
                },

                {
                    key: "country",
                    label: "بلد الصنع",
                    type: "text"
                },

                {
                    key: "condition",
                    label: "الحالة",
                    type: "text"
                }
            ],

            data: data.pumps,
            addRow: true
        }
    );


    const getAttachments =
        createTechnicalAttachments(
            container,
            "الروبة",
            data.attachments
        );

    container._getAttachments =
        getAttachments;

    createTechnicalSaveButton(
        container,
        "الروبة"
    );
}


/* =========================================================
   FILTERS
   ========================================================= */

/* =========================================================
   FILTERS
   ========================================================= */

function renderFiltersTechnicalFeatures(
    container,
    savedData = null
) {

    const data =
        savedData || {

            filters: [],
            media: [],
            washPumps: [],
            modules: [],
            attachments: []
        };


    const ultrafiltration =
        isUltrafiltrationSystem();


    /* =====================================================
       جدول المرشحات
       يظهر فقط في الأنظمة غير الفائق
       ===================================================== */

    if (!ultrafiltration) {

        createTechnicalTable(
            container,
            {
                title: "المرشحات",

                columns: [

                    {
                        key: "stage",
                        label: "المرحلة",
                        type: "text"
                    },

                    {
                        key: "filterCount",
                        label: "عدد المرشحات",
                        type: "number",
                        step: "1"
                    },

                    {
                        key: "basic",
                        label: "الأساسي",
                        type: "number",
                        step: "1"
                    },

                    {
                        key: "spare",
                        label: "الاحتياطي",
                        type: "number",
                        step: "1"
                    },

                    {
                        key: "filterVolume",
                        label: "حجم المرشح الواحد",
                        type: "number"
                    },

                    {
                        key: "filterFlow",
                        label: "تصرف المرشح",
                        type: "number"
                    },

                    {
                        key: "filtrationSystem",
                        label: "منظومة الترشيح",
                        type: "text"
                    },

                    {
                        key: "flowMeasurement",
                        label: "قياس التصرف لكل مرشح",
                        type: "text"
                    }
                ],

                data: data.filters,
                addRow: true
            }
        );


        /* =================================================
           توصيف الوسط الترشيحي
           يظهر فقط في الترشيح التقليدي
           ================================================= */

        createTechnicalTable(
            container,
            {
                title: "توصيف الوسط الترشيحي",

                columns: [

                    {
                        key: "gravelDiameter",
                        label: "قطر الوسط الزلطى",
                        type: "number"
                    },

                    {
                        key: "gravelDepth",
                        label: "العمق",
                        type: "number"
                    },

                    {
                        key: "gravelCondition",
                        label: "الحالة",
                        type: "text"
                    },

                    {
                        key: "gravelYear",
                        label:
                            "سنة نزول الوسط (تغيير / تزويد)",
                        type: "text"
                    },

                    {
                        key: "sandDiameterGradient",
                        label:
                            "القطر / التدرج الوسط الرملى",
                        type: "text"
                    },

                    {
                        key: "sandDepth",
                        label: "العمق",
                        type: "number"
                    },

                    {
                        key: "sandCondition",
                        label: "الحالة",
                        type: "text"
                    },

                    {
                        key: "sandYear",
                        label:
                            "سنة نزول الوسط (تغيير / تزويد)",
                        type: "text"
                    }
                ],

                data: data.media,
                addRow: true
            }
        );
    }


    /* =====================================================
       طلمبات غسيل المرشحات
       تظهر في جميع الحالات
       ===================================================== */

    createTechnicalTable(
        container,
        {
            title: "طلمبات غسيل المرشحات",

            columns: [

                {
                    key: "stage",
                    label: "المرحلة",
                    type: "text"
                },

                {
                    key: "type",
                    label: "الصنف",
                    type: "text"
                },

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    step: "1"
                },

                {
                    key: "basic",
                    label: "أساسى",
                    type: "number",
                    step: "1"
                },

                {
                    key: "spare",
                    label: "احتياطي",
                    type: "number",
                    step: "1"
                },

                {
                    key: "designFlow",
                    label: "التصرف التصميمي (ل/ث)",
                    type: "number"
                },

                {
                    key: "power",
                    label: "القدرة",
                    type: "number"
                },

                {
                    key: "head",
                    label: "الرفع (م)",
                    type: "number"
                },

                {
                    key: "rpm",
                    label: "عدد اللفات (لفة/دقيقة)",
                    type: "number"
                },

                {
                    key: "capacity",
                    label: "السعة",
                    type: "number"
                },

                {
                    key: "country",
                    label: "بلد الصنع",
                    type: "text"
                }
            ],

            data: data.washPumps,
            addRow: true
        }
    );


    /* =====================================================
       Modules
       يظهر فقط في الترشيح الفائق
       ===================================================== */

    if (ultrafiltration) {

        createTechnicalTable(
            container,
            {
                title: "Modules",

                columns: [

                    {
                        key: "containerCount",
                        label: "1 container",
                        type: "number",
                        min: 0,
                        step: "1"
                    },

                    {
                        key: "material",
                        label: "مادة الصنع",
                        type: "text"
                    },

                    {
                        key: "poreSize",
                        label: "حجم الثقوب (micro)",
                        type: "number",
                        min: 0,
                        step: "any"
                    },

                    {
                        key: "membraneArea",
                        label: "مساحة الغشاء (م²)",
                        type: "number",
                        min: 0,
                        step: "any"
                    },

                    {
                        key: "country",
                        label: "بلد الصنع",
                        type: "text"
                    }
                ],

                data: data.modules,
                addRow: true
            }
        );
    }


    /* =====================================================
       المرفقات
       ===================================================== */

    const getAttachments =
        createTechnicalAttachments(
            container,
            "المرشحات",
            data.attachments
        );

    container._getAttachments =
        getAttachments;


    /* =====================================================
       حفظ البيانات
       ===================================================== */

    createTechnicalSaveButton(
        container,
        "المرشحات"
    );
}



/* =========================================================
   CEB SYSTEM
   ========================================================= */

function renderCEBTechnicalFeatures(
    container,
    savedData = null
) {

    const data =
        savedData || {

            pumps: [],
            tanks: [],
            attachments: []
        };


    /* =====================================================
       الطلمبات
       ===================================================== */

    createTechnicalTable(
        container,
        {
            title: "الطلمبات",

            columns: [

                {
                    key: "stage",
                    label: "المرحلة",
                    type: "text"
                },

                {
                    key: "type",
                    label: "الصنف",
                    type: "text"
                },

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "basic",
                    label: "أساسى",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "spare",
                    label: "احتياطي",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "designFlow",
                    label: "التصرف التصميمي (ل/ث)",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "power",
                    label: "القدرة",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "head",
                    label: "الرفع (م)",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "rpm",
                    label: "عدد اللفات (لفة/دقيقة)",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "capacity",
                    label: "السعة",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "country",
                    label: "بلد الصنع",
                    type: "text"
                },

                {
                    key: "condition",
                    label: "الحالة",
                    type: "text"
                }
            ],

            data: data.pumps,
            addRow: true
        }
    );


    /* =====================================================
       التانكات
       ===================================================== */

    createTechnicalTable(
        container,
        {
            title: "التانكات",

            columns: [

                {
                    key: "tankCount",
                    label: "عدد تنكات تخزين الكيمياويات",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "tankType",
                    label: "نوع التانك",
                    type: "text"
                },

                {
                    key: "tankCapacity",
                    label: "سعة التانك (م³)",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "country",
                    label: "بلد الصنع",
                    type: "text"
                },

                {
                    key: "condition",
                    label: "الحالة",
                    type: "text"
                }
            ],

            data: data.tanks,
            addRow: true
        }
    );


    /* =====================================================
       المرفقات
       ===================================================== */

    const getAttachments =
        createTechnicalAttachments(
            container,
            "منظومة CEB",
            data.attachments
        );

    container._getAttachments =
        getAttachments;

    createTechnicalSaveButton(
        container,
        "منظومة CEB"
    );
}


/* =========================================================
   CIP SYSTEM
   ========================================================= */

function renderCIPTechnicalFeatures(
    container,
    savedData = null
) {

    const data =
        savedData || {

            pumps: [],
            tanks: [],
            cartridgeFilters: [],
            heater: [],
            attachments: []
        };


    /* =====================================================
       الطلمبات
       ===================================================== */

    createTechnicalTable(
        container,
        {
            title: "الطلمبات",

            columns: [

                {
                    key: "stage",
                    label: "المرحلة",
                    type: "text"
                },

                {
                    key: "type",
                    label: "الصنف",
                    type: "text"
                },

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "basic",
                    label: "أساسى",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "spare",
                    label: "احتياطي",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "designFlow",
                    label: "التصرف التصميمي (ل/ث)",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "power",
                    label: "القدرة",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "head",
                    label: "الرفع (م)",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "rpm",
                    label: "عدد اللفات (لفة/دقيقة)",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "capacity",
                    label: "السعة",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "country",
                    label: "بلد الصنع",
                    type: "text"
                },

                {
                    key: "condition",
                    label: "الحالة",
                    type: "text"
                }
            ],

            data: data.pumps,
            addRow: true
        }
    );


    /* =====================================================
       التانكات
       ===================================================== */

    createTechnicalTable(
        container,
        {
            title: "التانكات",

            columns: [

                {
                    key: "tankCount",
                    label: "عدد تنكات تخزين الكيمياويات",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "tankType",
                    label: "نوع التانك",
                    type: "text"
                },

                {
                    key: "tankCapacity",
                    label: "سعة التانك (م³)",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "country",
                    label: "بلد الصنع",
                    type: "text"
                },

                {
                    key: "condition",
                    label: "الحالة",
                    type: "text"
                }
            ],

            data: data.tanks,
            addRow: true
        }
    );


    /* =====================================================
       كارتلج فلتر
       ===================================================== */

    createTechnicalTable(
        container,
        {
            title: "كارتلج فلتر",

            columns: [

                {
                    key: "count",
                    label: "عدد كارتلج فلتر",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "material",
                    label: "مادة الصنع",
                    type: "text"
                },

                {
                    key: "maxPressure",
                    label: "أقصى ضغط (بار)",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "diameter",
                    label: "قطره (بوصة)",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "condition",
                    label: "حالة الكارتلج",
                    type: "text"
                }
            ],

            data: data.cartridgeFilters,
            addRow: true
        }
    );


    /* =====================================================
       السخان الكهربائى
       ===================================================== */

    createTechnicalTable(
        container,
        {
            title: "السخان الكهربائى",

            columns: [

                {
                    key: "count",
                    label: "عدد",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "basic",
                    label: "أساسى",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "spare",
                    label: "احتياطى",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "type",
                    label: "النوع",
                    type: "text"
                },

                {
                    key: "power",
                    label: "القدرة (كيلو وات)",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "country",
                    label: "بلد الصنع",
                    type: "text"
                },

                {
                    key: "condition",
                    label: "الحالة",
                    type: "text"
                }
            ],

            data: data.heater,
            addRow: true
        }
    );


    /* =====================================================
       المرفقات
       ===================================================== */

    const getAttachments =
        createTechnicalAttachments(
            container,
            "منظومة CIP",
            data.attachments
        );

    container._getAttachments =
        getAttachments;

    createTechnicalSaveButton(
        container,
        "منظومة CIP"
    );
}


/* =========================================================
   TANKS
   ========================================================= */

function renderTanksTechnicalFeatures(
    container,
    savedData = null
) {

    const data =
        savedData || {

            rows: [],
            attachments: []
        };


    createTechnicalTable(
        container,
        {
            title: "الخزانات",

            columns: [

                {
                    key: "stage",
                    label: "المرحلة",
                    type: "text"
                },

                {
                    key: "type",
                    label: "النوع",
                    type: "select",
                    options: [
                        "الخزان الارضى",
                        "الخزان العلوى",
                        "خزان اسفل المرشحات",
                        "خزان بيارة الطلمبات المرشحة"
                    ]
                },

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    step: "1"
                },

                {
                    key: "storageCapacity",
                    label: "السعة التخزينية",
                    type: "number"
                },

                {
                    key: "ventilationPipes",
                    label: "أسلاك تهوية",
                    type: "checkbox"
                },

                {
                    key: "ladders",
                    label: "سلالم",
                    type: "checkbox"
                },

                {
                    key: "covers",
                    label: "أغطية",
                    type: "checkbox"
                },

                {
                    key: "needsRehabilitation",
                    label: "يحتاج إلى تأهيل",
                    type: "text"
                }
            ],

            data: data.rows,
            addRow: true
        }
    );


    const getAttachments =
        createTechnicalAttachments(
            container,
            "الخزانات",
            data.attachments
        );

    container._getAttachments =
        getAttachments;

    createTechnicalSaveButton(
        container,
        "الخزانات"
    );
}


/* =========================================================
   FLOW METERS
   ========================================================= */

function renderFlowMetersTechnicalFeatures(
    container,
    savedData = null
) {

    const data =
        savedData || {

            rows: [],
            attachments: []
        };


    createTechnicalTable(
        container,
        {
            title:
                "أجهزة القياس والتصرف",

            columns: [

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    step: "1"
                },

                {
                    key: "type",
                    label: "النوع",
                    type: "text"
                },

                {
                    key: "measurementType",
                    label: "لحظى / تراكمى",
                    type: "text"
                },

                {
                    key: "model",
                    label: "الموديل",
                    type: "text"
                },

                {
                    key: "country",
                    label: "بلد الصنع",
                    type: "text"
                },

                {
                    key: "condition",
                    label: "الحالة",
                    type: "text"
                }
            ],

            data: data.rows,
            addRow: true
        }
    );


    const getAttachments =
        createTechnicalAttachments(
            container,
            "أجهزة القياس والتصرف",
            data.attachments
        );

    container._getAttachments =
        getAttachments;

    createTechnicalSaveButton(
        container,
        "أجهزة القياس والتصرف"
    );
}


/* =========================================================
   GENERATOR ROOM
   ========================================================= */

function renderGeneratorRoomTechnicalFeatures(
    container,
    savedData = null
) {

    const data =
        savedData || {

            rows: [
                {
                    equipment: "المولد الكهربائى",
                    count: "",
                    power: "",
                    rpm: "",
                    fuelReserve: "",
                    status: ""
                }
            ],

            attachments: []
        };


    createTechnicalTable(
        container,
        {
            title: "بيانات المولد الكهربائى",

            columns: [

                {
                    key: "equipment",
                    label: "المعدة",
                    type: "static",
                    defaultValue: "المولد الكهربائى"
                },

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "power",
                    label: "القدرة",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "rpm",
                    label: "اللفات",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "fuelReserve",
                    label: "احتياطي الوقود",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "status",
                    label: "الحالة",
                    type: "text"
                }
            ],

            data: data.rows,
            addRow: true
        }
    );


    const getAttachments =
        createTechnicalAttachments(
            container,
            "عنبر المولد الكهربائى",
            data.attachments
        );

    container._getAttachments =
        getAttachments;

    createTechnicalSaveButton(
        container,
        "عنبر المولد الكهربائى"
    );
}


/* =========================================================
   TRANSFORMER ROOM
   ========================================================= */

function renderTransformerRoomTechnicalFeatures(
    container,
    savedData = null
) {

    const data =
        savedData || {

            rows: [
                {
                    equipment: "المحول الكهربائى",
                    count: "",
                    power: "",
                    status: ""
                }
            ],

            attachments: []
        };


    createTechnicalTable(
        container,
        {
            title: "بيانات المحول الكهربائى",

            columns: [

                {
                    key: "equipment",
                    label: "المعدة",
                    type: "static",
                    defaultValue: "المحول الكهربائى"
                },

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "power",
                    label: "القدرة",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "status",
                    label: "الحالة",
                    type: "text"
                }
            ],

            data: data.rows,
            addRow: true
        }
    );


    const getAttachments =
        createTechnicalAttachments(
            container,
            "عنبر المحول الكهربائى",
            data.attachments
        );

    container._getAttachments =
        getAttachments;

    createTechnicalSaveButton(
        container,
        "عنبر المحول الكهربائى"
    );
}


/* =========================================================
   ALUM
   ========================================================= */

function renderAlumTechnicalFeatures(
    container,
    savedData = null
) {

    const data =
        savedData || {

            alum: [],
            mixers: [],
            pumps: [],
            injectionLines: [],
            attachments: []
        };


    createTechnicalTable(
        container,
        {
            title: "بيانات الشبة",

            columns: [

                {
                    key: "user",
                    label: "المستخدم",
                    type: "text"
                },

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "tankCapacity",
                    label: "سعة التانك",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "type",
                    label: "النوع",
                    type: "text"
                },

                {
                    key: "preparationTankCapacity",
                    label: "سعة حوض التحضير",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "condition",
                    label: "الحالة",
                    type: "text"
                },

                {
                    key: "mixing",
                    label: "التقليب",
                    type: "text"
                }
            ],

            data: data.alum,
            addRow: true
        }
    );


    createTechnicalTable(
        container,
        {
            title: "قلابات الشبة",

            columns: [

                {
                    key: "stage",
                    label: "المرحلة",
                    type: "text"
                },

                {
                    key: "basic",
                    label: "أساسي",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "spare",
                    label: "احتياطي",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "type",
                    label: "النوع",
                    type: "text"
                },

                {
                    key: "country",
                    label: "بلد المنشأ",
                    type: "text"
                },

                {
                    key: "speed",
                    label: "السرعة",
                    type: "number",
                    min: 0,
                    step: "any"
                }
            ],

            data: data.mixers,
            addRow: true
        }
    );


    createTechnicalTable(
        container,
        {
            title: "طلمبات الشبة",

            columns: [

                {
                    key: "stage",
                    label: "المرحلة",
                    type: "text"
                },

                {
                    key: "basic",
                    label: "أساسي",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "spare",
                    label: "احتياطي",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "type",
                    label: "النوع",
                    type: "text"
                },

                {
                    key: "designFlow",
                    label: "التصرف التصميمي",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "country",
                    label: "بلد المنشأ",
                    type: "text"
                },

                {
                    key: "calibration",
                    label: "المعايرة",
                    type: "text"
                },

                {
                    key: "injectionPoint",
                    label: "نقطة الحقن",
                    type: "text"
                },

                {
                    key: "speed",
                    label: "السرعة",
                    type: "number",
                    min: 0,
                    step: "any"
                },

                {
                    key: "head",
                    label: "الرفع",
                    type: "number",
                    min: 0,
                    step: "any"
                }
            ],

            data: data.pumps,
            addRow: true
        }
    );


    createTechnicalTable(
        container,
        {
            title: "خطوط الحقن",

            columns: [

                {
                    key: "count",
                    label: "العدد",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "basic",
                    label: "الأساسي",
                    type: "number",
                    min: 0,
                    step: "1"
                },

                {
                    key: "spare",
                    label: "الاحتياطي",
                    type: "number",
                    min: 0,
                    step: "1"
                }
            ],

            data: data.injectionLines,
            addRow: true
        }
    );


    const getAttachments =
        createTechnicalAttachments(
            container,
            "الشبة",
            data.attachments
        );

    container._getAttachments =
        getAttachments;

    createTechnicalSaveButton(
        container,
        "الشبة"
    );
}


/* =========================================================
   INTAKE
   ========================================================= */

function renderIntakeTechnicalFeatures(
    container,
    savedData = null
) {

    const data =
        savedData || {

            intakeType: "",
            sourceDepth: "",

            protections: {

                barScreens: false,
                mesh: false,
                fence: false,
                gate: false,
                lighting: false,
                floatingBaffles: false,
                oilGrease: false
            },

            suctionPipes: [],
            attachments: []
        };


    const basicTitle =
        document.createElement("div");

    basicTitle.className =
        "technical-subtitle";

    basicTitle.textContent =
        "بيانات المأخذ";

    container.appendChild(basicTitle);


    const formGrid =
        document.createElement("div");

    formGrid.className =
        "technical-form-grid";


    const typeField =
        document.createElement("div");

    typeField.className =
        "technical-field";

    const typeLabel =
        document.createElement("label");

    typeLabel.textContent =
        "نوع المأخذ";

    const typeInput =
        document.createElement("input");

    typeInput.type =
        "text";

    typeInput.value =
        data.intakeType || "";

    typeField.appendChild(typeLabel);
    typeField.appendChild(typeInput);

    formGrid.appendChild(typeField);


    const depthField =
        document.createElement("div");

    depthField.className =
        "technical-field";

    const depthLabel =
        document.createElement("label");

    depthLabel.textContent =
        "عمق المصدر عند نقطة السحب";

    const depthInput =
        document.createElement("input");

    depthInput.type =
        "number";

    depthInput.min =
        "0";

    depthInput.step =
        "any";

    depthInput.value =
        data.sourceDepth || "";

    depthField.appendChild(depthLabel);
    depthField.appendChild(depthInput);

    formGrid.appendChild(depthField);

    container.appendChild(formGrid);


    const protectionTitle =
        document.createElement("div");

    protectionTitle.className =
        "technical-subtitle";

    protectionTitle.textContent =
        "وسائل الحماية";

    container.appendChild(protectionTitle);


    const protectionGrid =
        document.createElement("div");

    protectionGrid.className =
        "technical-checkbox-grid";


    const protections = [

        {
            key: "barScreens",
            label: "مصافى ذات قضبان"
        },

        {
            key: "mesh",
            label: "شبك"
        },

        {
            key: "fence",
            label: "سور"
        },

        {
            key: "gate",
            label: "بوابة"
        },

        {
            key: "lighting",
            label: "انارة"
        },

        {
            key: "floatingBaffles",
            label: "صاولات عائمة"
        },

        {
            key: "oilGrease",
            label: "مانعات وماصات زيوت وشحوم"
        }
    ];


    protections.forEach(
        protection => {

            const label =
                document.createElement("label");

            label.className =
                "technical-checkbox";

            const checkbox =
                document.createElement("input");

            checkbox.type =
                "checkbox";

            checkbox.dataset.key =
                protection.key;

            checkbox.checked =
                Boolean(
                    data.protections &&
                    data.protections[
                        protection.key
                    ]
                );

            const span =
                document.createElement("span");

            span.textContent =
                protection.label;

            label.appendChild(checkbox);
            label.appendChild(span);

            protectionGrid.appendChild(label);
        }
    );

    container.appendChild(protectionGrid);


    const pipesTitle =
        document.createElement("div");

    pipesTitle.className =
        "technical-subtitle";

    pipesTitle.textContent =
        "مواسير السحب";

    container.appendChild(pipesTitle);


    const tableSection =
        document.createElement("div");

    tableSection.className =
        "technical-table-section";


    const tableWrapper =
        document.createElement("div");

    tableWrapper.className =
        "technical-table-wrapper";


    const table =
        document.createElement("table");

    table.className =
        "technical-table";


    table.innerHTML = `

        <thead>

            <tr>

                <th>عدد مواسير السحب</th>
                <th>نوع الماسورة</th>
                <th>الأساسى</th>
                <th>الاحتياطى</th>
                <th>القطر (بوصة)</th>
                <th>حذف</th>

            </tr>

        </thead>

        <tbody></tbody>

    `;


    const tbody =
        table.querySelector("tbody");


    const pipes =
        Array.isArray(data.suctionPipes)
            ? data.suctionPipes
            : [];


    if (pipes.length > 0) {

        pipes.forEach(pipe => {

            addSuctionPipeRow(
                tbody,
                pipe
            );
        });

    } else {

        addSuctionPipeRow(tbody);
    }


    /*
     * زر إضافة صف لمواسير السحب.
     */
    const addActions =
        document.createElement("div");

    addActions.className =
        "technical-add-row-actions";

    const addButton =
        document.createElement("button");

    addButton.type =
        "button";

    addButton.className =
        "technical-add-row-button";

    addButton.textContent =
        "+ إضافة صف";

    addButton.addEventListener(
        "click",
        function () {

            addSuctionPipeRow(tbody);
        }
    );

    addActions.appendChild(addButton);


    tableWrapper.appendChild(table);

    tableSection.appendChild(tableWrapper);
    tableSection.appendChild(addActions);

    container.appendChild(tableSection);


    const getAttachments =
        createTechnicalAttachments(
            container,
            "المأخذ",
            data.attachments
        );

    container._getAttachments =
        getAttachments;


    createTechnicalSaveButton(
        container,
        "المأخذ"
    );
}


/* =========================================================
   SUCTION PIPE ROW
   ========================================================= */

function addSuctionPipeRow(
    tbody,
    savedPipe = null
) {

    const row =
        document.createElement("tr");


    const values = [

        savedPipe?.count ?? "",
        savedPipe?.type ?? "",
        savedPipe?.basicCount ?? "",
        savedPipe?.spareCount ?? "",
        savedPipe?.diameter ?? ""
    ];


    const types = [

        "number",
        "text",
        "number",
        "number",
        "number"
    ];


    values.forEach(
        (value, index) => {

            const cell =
                document.createElement("td");

            const input =
                document.createElement("input");

            input.type =
                types[index];

            input.value =
                value;

            if (
                types[index] === "number"
            ) {

                input.min =
                    "0";

                input.step =
                    "any";
            }

            cell.appendChild(input);

            row.appendChild(cell);
        }
    );


    const deleteCell =
        document.createElement("td");

    const deleteButton =
        document.createElement("button");

    deleteButton.type =
        "button";

    deleteButton.className =
        "technical-delete-row";

    deleteButton.textContent =
        "🗑";

    deleteButton.addEventListener(
        "click",
        function () {

            row.remove();
        }
    );

    deleteCell.appendChild(
        deleteButton
    );

    row.appendChild(deleteCell);

    tbody.appendChild(row);
}


/* =========================================================
   COLLECT SUCTION PIPES
   ========================================================= */

function collectSuctionPipes(
    card = null
) {

    const targetCard =
        card ||
        document.querySelector(
            '.technical-component-card[data-component="المأخذ"]'
        );

    if (!targetCard) {
        return [];
    }

    const result = [];

    const rows =
        targetCard.querySelectorAll(
            ".technical-table tbody tr"
        );


    rows.forEach(row => {

        const inputs =
            row.querySelectorAll("input");

        if (inputs.length < 5) {
            return;
        }

        const allEmpty =
            Array.from(inputs)
                .slice(0, 5)
                .every(input =>
                    String(
                        input.value ?? ""
                    ).trim() === ""
                );

        if (allEmpty) {
            return;
        }

        result.push({

            count:
                inputs[0].value === ""
                    ? ""
                    : Number(
                        inputs[0].value
                    ),

            type:
                inputs[1].value.trim(),

            basicCount:
                inputs[2].value === ""
                    ? ""
                    : Number(
                        inputs[2].value
                    ),

            spareCount:
                inputs[3].value === ""
                    ? ""
                    : Number(
                        inputs[3].value
                    ),

            diameter:
                inputs[4].value === ""
                    ? ""
                    : Number(
                        inputs[4].value
                    )
        });
    });

    return result;
}


/* =========================================================
   SAVE TECHNICAL COMPONENT
   ========================================================= */

function saveTechnicalComponent(
    component
) {

    const card =
        document.querySelector(
            `.technical-component-card[data-component="${component}"]`
        );

    if (!card) {
        return;
    }


    const canonicalComponent =
        getCanonicalTechnicalComponent(
            component
        );


    /* =====================================================
       المأخذ
       ===================================================== */

    if (component === "المأخذ") {

        const fields =
            card.querySelectorAll(
                ".technical-form-grid .technical-field input"
            );

        const protections = {};

        card
            .querySelectorAll(
                ".technical-checkbox input"
            )
            .forEach(checkbox => {

                const key =
                    checkbox.dataset.key;

                if (!key) {
                    return;
                }

                protections[key] =
                    checkbox.checked;
            });


        technicalFeaturesData[
            canonicalComponent
        ] = {

            intakeType:
                fields[0]
                    ? fields[0].value.trim()
                    : "",

            sourceDepth:
                fields[1]
                    ? fields[1].value
                    : "",

            protections:
                protections,

            suctionPipes:
                collectSuctionPipes(card),

            attachments:
                card._getAttachments
                    ? card._getAttachments()
                    : []
        };


        if (
            canonicalComponent !== component
        ) {

            delete technicalFeaturesData[
                component
            ];
        }


        persistTechnicalFeatures();

        alert(
            "تم حفظ بيانات المأخذ."
        );

        return;
    }


    /* =====================================================
       بيارة العكرة
       ===================================================== */

    if (component === "بيارة العكرة") {

        technicalFeaturesData[
            canonicalComponent
        ] = {

            rows:
                collectTechnicalTableData(
                    card,
                    0
                ),

            attachments:
                card._getAttachments
                    ? card._getAttachments()
                    : []
        };

        persistTechnicalFeatures();

        alert(
            "تم حفظ بيانات بيارة العكرة."
        );

        return;
    }


    /* =====================================================
       بئر التوزيع
       ===================================================== */

    if (component === "بئر التوزيع") {

        technicalFeaturesData[
            canonicalComponent
        ] = {

            rows:
                collectTechnicalTableData(
                    card,
                    0
                ),

            attachments:
                card._getAttachments
                    ? card._getAttachments()
                    : []
        };

        persistTechnicalFeatures();

        alert(
            "تم حفظ بيانات بئر التوزيع."
        );

        return;
    }


    /* =====================================================
       PUMP ROOMS
       ===================================================== */

    if (

        component === "عنبر طلمبات العكرة" ||

        component === "عنبر الطلمبات العكرة" ||

        component === "عنبر طلمبات المرشحة" ||

        component === "عنبر الطلمبات المرشحة" ||

        component ===
            "عنبر طلمبات المياه العكرة والمرشحة" ||

        component ===
            "عنبر الطلمبات العكرة والمرشحة"

    ) {

        technicalFeaturesData[
            canonicalComponent
        ] = {

            pumps:
                collectTechnicalTableData(
                    card,
                    0
                ),

            attachments:
                card._getAttachments
                    ? card._getAttachments()
                    : []
        };

        if (
            canonicalComponent !== component
        ) {

            delete technicalFeaturesData[
                component
            ];
        }

        persistTechnicalFeatures();

        alert(
            "تم حفظ بيانات الطلمبات."
        );

        return;
    }


    /* =====================================================
       CLARIFIERS
       ===================================================== */

    if (component === "المروقات") {

        technicalFeaturesData[
            canonicalComponent
        ] = {

            clarifiers:
                collectTechnicalTableData(
                    card,
                    0
                ),

            rapidMixers:
                collectTechnicalTableData(
                    card,
                    1
                ),

            slowMixers:
                collectTechnicalTableData(
                    card,
                    2
                ),

            bridges:
                collectTechnicalTableData(
                    card,
                    3
                ),

            attachments:
                card._getAttachments
                    ? card._getAttachments()
                    : []
        };

        persistTechnicalFeatures();

        alert(
            "تم حفظ بيانات المروقات."
        );

        return;
    }


    /* =====================================================
       SEDIMENTATION BASINS
       ===================================================== */

    if (
        component === "احواض الترسيب" ||
        component === "أحواض الترسيب"
    ) {

        technicalFeaturesData[
            canonicalComponent
        ] = {

            basins:
                collectTechnicalTableData(
                    card,
                    0
                ),

            bridges:
                collectTechnicalTableData(
                    card,
                    1
                ),

            attachments:
                card._getAttachments
                    ? card._getAttachments()
                    : []
        };

        if (
            canonicalComponent !== component
        ) {

            delete technicalFeaturesData[
                component
            ];
        }

        persistTechnicalFeatures();

        alert(
            "تم حفظ بيانات أحواض الترسيب."
        );

        return;
    }


    /* =====================================================
       CHLORINE ROOM
       ===================================================== */

    if (
        component === "عنبر الكلور" ||
        component === "منظومة الكلور"
    ) {

        technicalFeaturesData[
            canonicalComponent
        ] = {

            chlorinePumps:
                collectTechnicalTableData(
                    card,
                    0
                ),

            boosters:
                collectTechnicalTableData(
                    card,
                    1
                ),

            cylinderStore:
                collectTechnicalTableData(
                    card,
                    2
                ),

            attachments:
                card._getAttachments
                    ? card._getAttachments()
                    : []
        };

        if (
            canonicalComponent !== component
        ) {

            delete technicalFeaturesData[
                component
            ];
        }

        persistTechnicalFeatures();

        alert(
            "تم حفظ بيانات عنبر الكلور."
        );

        return;
    }


    /* =====================================================
       CHLORINE LEAK
       ===================================================== */

    if (
        component ===
            "منظومة التعامل مع تسريب الكلور"
    ) {

        technicalFeaturesData[
            canonicalComponent
        ] = {

            system:
                collectTechnicalTableData(
                    card,
                    0
                ),

            pumps:
                collectTechnicalTableData(
                    card,
                    1
                ),

            attachments:
                card._getAttachments
                    ? card._getAttachments()
                    : []
        };

        persistTechnicalFeatures();

        alert(
            "تم حفظ بيانات منظومة التعامل مع تسريب الكلور."
        );

        return;
    }


    /* =====================================================
       SLUDGE
       ===================================================== */

    if (component === "الروبة") {

        technicalFeaturesData[
            canonicalComponent
        ] = {

            sludge:
                collectTechnicalTableData(
                    card,
                    0
                ),

            pumps:
                collectTechnicalTableData(
                    card,
                    1
                ),

            attachments:
                card._getAttachments
                    ? card._getAttachments()
                    : []
        };

        persistTechnicalFeatures();

        alert(
            "تم حفظ بيانات الروبة."
        );

        return;
    }


    /* =====================================================
       FILTERS
       ===================================================== */

    if (component === "المرشحات") {

        const result = {

            filters:
                collectTechnicalTableData(
                    card,
                    0
                ),

            /*
             * عند الترشيح الفائق لا يوجد جدول الوسط.
             */
            media:
                isUltrafiltrationSystem()
                    ? (
                        technicalFeaturesData[
                            "المرشحات"
                        ]?.media || []
                    )
                    : collectTechnicalTableData(
                        card,
                        1
                    ),

            washPumps:
                collectTechnicalTableData(
                    card,
                    isUltrafiltrationSystem()
                        ? 1
                        : 2
                ),

            attachments:
                card._getAttachments
                    ? card._getAttachments()
                    : []
        };


        if (
            isUltrafiltrationSystem()
        ) {

            /*
             * Modules هو الجدول الثاني
             * في حالة الترشيح الفائق.
             */
            result.modules =
                collectTechnicalTableData(
                    card,
                    2
                );

        } else {

            /*
             * الاحتفاظ بالبيانات القديمة
             * عند تغيير نوع المحطة.
             */
            const oldData =
                technicalFeaturesData[
                    "المرشحات"
                ];

            result.modules =
                oldData &&
                Array.isArray(
                    oldData.modules
                )
                    ? oldData.modules
                    : [];
        }


        technicalFeaturesData[
            canonicalComponent
        ] = result;


        persistTechnicalFeatures();

        alert(
            isUltrafiltrationSystem()
                ? "تم حفظ بيانات المرشحات والموديولات."
                : "تم حفظ بيانات المرشحات."
        );

        return;
    }


    /* =====================================================
       TANKS
       ===================================================== */

    if (component === "الخزانات") {

        technicalFeaturesData[
            canonicalComponent
        ] = {

            rows:
                collectTechnicalTableData(
                    card,
                    0
                ),

            attachments:
                card._getAttachments
                    ? card._getAttachments()
                    : []
        };

        persistTechnicalFeatures();

        alert(
            "تم حفظ بيانات الخزانات."
        );

        return;
    }


    /* =====================================================
       ELECTRICAL POWER ROOM
       ===================================================== */

    if (
        component === "عنبر المولد الكهربائى" ||
        component === "عنبر المحول الكهربائى"
    ) {

        const rows =
            collectTechnicalTableData(
                card,
                0
            );

        technicalFeaturesData[
            canonicalComponent
        ] = {

            rows: rows,

            attachments:
                card._getAttachments
                    ? card._getAttachments()
                    : []
        };

        persistTechnicalFeatures();

        alert(
            "تم حفظ بيانات الكهرباء."
        );

        return;
    }


    /* =====================================================
       FLOW METERS
       ===================================================== */

    if (
        component === "اجهزة القياس والتصرف" ||
        component === "أجهزة القياس والتصرف"
    ) {

        technicalFeaturesData[
            canonicalComponent
        ] = {

            rows:
                collectTechnicalTableData(
                    card,
                    0
                ),

            attachments:
                card._getAttachments
                    ? card._getAttachments()
                    : []
        };

        if (
            canonicalComponent !== component
        ) {

            delete technicalFeaturesData[
                component
            ];
        }

        persistTechnicalFeatures();

        alert(
            "تم حفظ بيانات أجهزة القياس والتصرف."
        );

        return;
    }


    /* =====================================================
       ALUM
       ===================================================== */

    if (component === "منظومة الشبة") {

        technicalFeaturesData[
            canonicalComponent
        ] = {

            alum:
                collectTechnicalTableData(
                    card,
                    0
                ),

            mixers:
                collectTechnicalTableData(
                    card,
                    1
                ),

            pumps:
                collectTechnicalTableData(
                    card,
                    2
                ),

            injectionLines:
                collectTechnicalTableData(
                    card,
                    3
                ),

            attachments:
                card._getAttachments
                    ? card._getAttachments()
                    : []
        };

        persistTechnicalFeatures();

        alert(
            "تم حفظ بيانات الشبة."
        );

        return;
    }


    /* =====================================================
       CEB
       ===================================================== */

    if (component === "منظومة CEB") {

        technicalFeaturesData[
            canonicalComponent
        ] = {

            pumps:
                collectTechnicalTableData(
                    card,
                    0
                ),

            tanks:
                collectTechnicalTableData(
                    card,
                    1
                ),

            attachments:
                card._getAttachments
                    ? card._getAttachments()
                    : []
        };

        persistTechnicalFeatures();

        alert(
            "تم حفظ بيانات منظومة CEB."
        );

        return;
    }


    /* =====================================================
       CIP
       ===================================================== */

    if (component === "منظومة CIP") {

        technicalFeaturesData[
            canonicalComponent
        ] = {

            pumps:
                collectTechnicalTableData(
                    card,
                    0
                ),

            tanks:
                collectTechnicalTableData(
                    card,
                    1
                ),

            cartridgeFilters:
                collectTechnicalTableData(
                    card,
                    2
                ),

            heater:
                collectTechnicalTableData(
                    card,
                    3
                ),

            attachments:
                card._getAttachments
                    ? card._getAttachments()
                    : []
        };

        persistTechnicalFeatures();

        alert(
            "تم حفظ بيانات منظومة CIP."
        );

        return;
    }


    /* =====================================================
       FALLBACK
       ===================================================== */
    technicalFeaturesData[canonicalComponent] = {

        rows:
            collectTechnicalTableData(
                card,
                0
            ),

        attachments:
            card._getAttachments
                ? card._getAttachments()
                : []
    };

    persistTechnicalFeatures();
    alert("Data Saved successfully.");
}
/* =========================================================
   LOCAL STORAGE
   ========================================================= */
function persistTechnicalFeatures() {

    try {

        localStorage.setItem("technicalFeaturesData", JSON.stringify(technicalFeaturesData));
    } catch (error) {
        console.error("Error saving technicalFeaturesData:", error);

        if (error && (error.name === "QuotaExceededError" || error.code === 22)) {
            console.warn(
                "LocalStorage quota exceeded. " + "Large attachments may exceed browser storage limits.");
        }
    }
}
/* =========================================================
   LOAD LOCAL STORAGE
   ========================================================= */

function loadTechnicalFeatures() {

    try {
        const saved = localStorage.getItem("technicalFeaturesData");

        if (!saved) {
            return;
        }

        const parsed = JSON.parse(saved);

        if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
            Object.assign(technicalFeaturesData, parsed);
        }

    } catch (error) {
        console.error("Error loading technicalFeaturesData:", error);
    }
}
/* =========================================================
   PROTECTION KEY
   ========================================================= */

function getProtectionKey(label) {

    const map = {
        "مصافى ذات قضبان":
            "barScreens",
        "شبك":
            "mesh",
        "سور":
            "fence",
        "بوابة":
            "gate",
        "انارة":
            "lighting",
        "صاولات عائمة":
            "floatingBaffles",
        "مانعات وماصات زيوت وشحوم":
            "oilGrease"
    };

    return map[String(label || "").trim()] || "";
}


/* =========================================================
   CONNECT COMPONENTS
   ========================================================= */

function connectTechnicalFeaturesToComponents() {

    const grid = document.getElementById("componentsGrid");

    if (!grid) {
        return;
    }

    if (grid.dataset.technicalConnected === "true") {
        return;
    }

    grid.dataset.technicalConnected = "true";

    grid.addEventListener("change", function (event) {
            if (event.target.matches('input[type="checkbox"]')) {
                updateTechnicalFeatures();
            }

            /*تغيير نوع المحطة يغير توصيف المرشحات:*/
            if (event.target.id === "type") {
                updateTechnicalFeatures();
            }
        }
    );
}
/* =========================================================
   CONNECT TYPE FIELD
   ========================================================= */

function connectTechnicalFeaturesToTypeField() {

    const typeElement = document.getElementById("type");

    if (!typeElement) {
        return;
    }

    if (typeElement.dataset.technicalConnected === "true") {
        return;
    }

    typeElement.dataset.technicalConnected = "true";

    typeElement.addEventListener("change", function () {
            updateTechnicalFeatures();
        }
    );
}
/* =========================================================
   AUTO SAVE HOOK
   ========================================================= */
document.addEventListener("input", function (event) {
        /*الحفظ من خلال زر "حفظ البيانات"*/
        if (event.target.closest(".technical-component-card")) {
            return;
        }
    }
);
/* =========================================================
   INITIALIZE
   ========================================================= */
function connectTechnicalWordExport() {

    const button = document.getElementById("exportTechnicalFeaturesWord");
    if (!button) {
        return;
    }

    if (button.dataset.connected === "true") {
        return;
    }
    button.dataset.connected = "true";

    button.addEventListener("click", exportTechnicalFeaturesToWord);
}

function initializeTechnicalFeatures() {
    loadTechnicalFeatures();
    connectTechnicalFeaturesToComponents();
    connectTechnicalFeaturesToTypeField();
    connectTechnicalWordExport();
    updateTechnicalFeatures();
}
