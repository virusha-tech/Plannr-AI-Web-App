import React from "react";
import { useEffect } from "react";
import { Layout } from "./Layout";

function AdminServices() {
  var options = {
    disableFields: [
      // "autocomplete",
      "button",
      // "file",
      // "header",
      "hidden",
      // "paragraph",
      // "number",
    ],
    disabledActionButtons: ["data"],
    controlOrder: ["header", "paragraph", "text", "textarea", "file"],
    disabledAttrs: [
      "access",
      "value",
      "style",
      "other",
      "step",
      "name",
      "subtype",
      "toggle",
      "className",
      "rows",
    ],
  };
  // var formData = [
  //   {
  //     type: "header",
  //     label: "Wedding Plan",
  //   },
  //   {
  //     type: "paragraph",
  //     label:
  //       "A sentence or paragraph you wish to understand in bullet point form.",
  //   },
  //   {
  //     type: "text",
  //     required: false,
  //     label: "Source",
  //     description: "Enter your source..",
  //     placeholder: "source",
  //     className: "form-control",
  //     name: "text-1681661194132-0",
  //     maxlength: 80,
  //   },
  //   {
  //     type: "radio-group",
  //     required: false,
  //     label: "Gender",
  //     inline: false,
  //     name: "radio-group-1681661312312-0",
  //     values: [
  //       {
  //         label: "Male",
  //         value: "Male",
  //         selected: false,
  //       },
  //       {
  //         label: "Female",
  //         value: "Female",
  //         selected: false,
  //       },
  //     ],
  //   },
  // ];
  // '[{"type":"text","label":"Full Name","subtype":"text","className":"form-control","name":"text-1476748004559"},{"type":"select","label":"Occupation","className":"form-control","name":"select-1476748006618","values":[{"label":"Street Sweeper","value":"option-1","selected":true},{"label":"Moth Man","value":"option-2"},{"label":"Chemist","value":"option-3"}]},{"type":"textarea","label":"Short Bio","rows":"5","className":"form-control","name":"textarea-1476748007461"}]';

  useEffect(() => {
    window.jQuery(function($) {
      const fbEditor = document.getElementById("fb-editor");
      const formBuilder = $(fbEditor).formBuilder(options);
      // formBuilder.promise.then((formBuilder) => {
      //   // formBuilder.actions.setData(formData);
      // });
    });
  }, []);

  return (
    <div>
      <Layout>
        <div style={{ margin: "50px" }}>
          <div id="fb-editor"></div>
        </div>
      </Layout>
    </div>
  );
}

export default AdminServices;
