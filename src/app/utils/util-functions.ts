// tslint:disable-next-line:typedef
export  function assignValidations(model: any[]) {
  model.forEach(field => {
    if (field.type === 'input' || field.type === 'textarea') {
      field.spellCheck = true;
    }
    if (field.required) {
      assignValidationField(field);
    }
  });
  return model;
}

// tslint:disable-next-line:typedef max-line-length
function assignValidationField(field: { [p: string]: boolean; type?: any; required?: any; // @ts-ignore
  // tslint:disable-next-line:max-line-length
  label?: string; validators?: { email?: any; required?: null | undefined }; errorMessages?: { email?: any; required?: string | undefined }; inputType?: string }) {
  // @ts-ignore
  if (!field.label.endsWith('</span>')) {
    field.label = `${field.label} <span class='text-danger'>*</span>`;
  }
  field.validators = {
    required: null
  };
  field.errorMessages = {
    required: 'This field is required.'
  };
  if (field.inputType === 'email') {
    field.validators.email = null;
    field.errorMessages.email = 'Email field is not valid';
  }
}
// tslint:disable-next-line:typedef
export function getRandomInt(max: number){
  return Math.floor(Math.random() * Math.floor(max));
}
