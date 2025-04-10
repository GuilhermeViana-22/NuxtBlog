// src/utils/swalConfig.js
import Swal from 'sweetalert2'

const defaultOptions = {
  confirmButtonColor: '#48bb78',
  cancelButtonColor: '#e53e3e',
  buttonsStyling: true,
  allowOutsideClick: false,
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  }
}

export const showError = (message, title = 'Erro') => {
  return Swal.fire({
    ...defaultOptions,
    icon: 'error',
    title,
    html: message,
    confirmButtonColor: '#e53e3e'
  })
}

export const showSuccess = (message, title = 'Sucesso!') => {
  return Swal.fire({
    ...defaultOptions,
    icon: 'success',
    title,
    html: message,
    timer: 5000
  })
}

export const showConfirm = (options) => {
  return Swal.fire({
    ...defaultOptions,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
    ...options
  })
}