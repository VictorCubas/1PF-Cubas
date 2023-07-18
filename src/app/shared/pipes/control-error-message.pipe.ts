import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'controlErrorMessage'
})
export class ControlErrorMessagePipe implements PipeTransform {

  transform(error: {key:string, value: any}, ...args: unknown[]): unknown {

    const errorMessages: Record<string, string> = {
      required: "Este campo es requerido",
      email : "El email debe ser valido",
      minlength: "El campo es muy corto"
    }

    // console.log(error); 
    return errorMessages[error.key];
  }

}
