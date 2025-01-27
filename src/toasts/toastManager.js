import toast from 'react-hot-toast'

// Generic function to display a toast notification
const showToast = (message, bgColor, type = 'error') => {
  const toastOptions = {
    position: 'bottom-center',
    duration: 4000,
    style: { background: bgColor, color: '#fff' }
  }

  const formattedMessage = message.charAt(0).toUpperCase() + message.slice(1)

  if (type === 'success') {
    toast.success(formattedMessage, toastOptions)
  } else if (type === 'warning') {
    toastOptions.icon = '⚠️'
    toast.custom(formattedMessage, toastOptions)
  } else {
    toast.error(formattedMessage, toastOptions)
  }
}

// Show a warning toast, styled with a yellow background
export const showLogoutToast = (message) => {
  showToast(message, '#e8d103', 'warning')
}

// Show an error toast
export const showErrorToast = (message) => {
  showToast(message, '#F44336', 'error')
}

// Show a success toast
export const showSuccessToast = (message) => {
  showToast(message, '#4CAF50', 'success')
}

export default { showLogoutToast, showErrorToast, showSuccessToast }
