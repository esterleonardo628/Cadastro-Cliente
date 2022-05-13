import sha1 from 'sha1'

export function ocultarSenha(senha){
  console.log(senha);
  var hash = sha1(senha);
  console.log(hash)
  return hash
}

