const roleValues = (role) => {
        switch(role){
          case 'user':
          case 'any':
          default:
            return 0
          case 'veterinario':
            return 1
          case 'farmaceutico':
            return 2
          case 'admin':
            return 3
        }
};
    
export const acessoValido = (roleRecebida, role) => {
    
          if(roleRecebida === role || roleRecebida === "any"){
            return true;
          } else if(roleValues(role) >= roleValues(roleRecebida)){
            return true; 
          } else {
            return false;
          }
        
}
