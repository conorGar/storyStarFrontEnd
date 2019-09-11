const authService = {
    isAuthenticated: () => {
        const token = localStorage.getItem('token')
  
        return token ? true : false
    },
  
    signOut: () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
    }
  }
  
  export default authService