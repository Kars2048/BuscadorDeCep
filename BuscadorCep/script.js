document.getElementById("buscar").addEventListener("click", function (event) {
  event.preventDefault();
  const cepInput = document.getElementById("buscadorTextArea").value;
  const enderecoCep = document.getElementById("enderecoCep");
  const loadingCep = document.getElementById("loadingCep");

  // Exibir o elemento de loading e ocultar o resultado
  enderecoCep.style.display = "none";
  loadingCep.style.display = "block";

  // Definir um atraso de 3 segundos antes de fazer a busca
  setTimeout(() => {
    const url = `https://viacep.com.br/ws/${cepInput}/json/`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          // CEP não encontrado
          enderecoCep.innerHTML = "<p>CEP não encontrado.</p>";
        } else {
          // Exibe as informações do endereço
          const endereco = `
            <p>CEP: ${data.cep}</p>
            <p>Logradouro: ${data.logradouro}</p>
            <p>Bairro: ${data.bairro}</p>
            <p>Cidade: ${data.localidade}</p>
            <p>Estado: ${data.uf}</p>
          `;
          enderecoCep.innerHTML = endereco;
        }
      })
      .catch((error) => {
        // Tratar erros, caso ocorra algum problema na requisição
        console.error("CEP não encontrado: ", error);
        enderecoCep.innerHTML =
          "<p>Endereço Invalido, Tente Novamente.</p>";
      })
      .finally(() => {
        // Esconder o elemento de loading após a busca (mesmo se ocorrer erro) e exibir o resultado
        loadingCep.style.display = "none";
        enderecoCep.style.display = "block";
      });
  }, 3000); // Definir o atraso em 3000 milissegundos (3 segundos)
});