// Função para resolver o sistema de equações pelo método de eliminação de Gauss
function gaussSolver(A, b){
    var i, j, k, l, m;

    // ETAPA DE ESCALONAMENTO
    for(k = 0; k < A.length - 1; k++){
        // Procura o maior k-ésimo coeficiente em módulo
        var max = Math.abs(A[k][k]);
        var maxIndex = k;
        for(i = k + 1; i < A.length; i++){
            if(max < Math.abs(A[i][k])){
                max = Math.abs(A[i][k]);
                maxIndex = i;
            }
        }
        if(maxIndex != k){
            // Troca a equação k pela equação com o maior k-ésimo coeficiente em módulo
            for(j = 0; j < A.length; j++){
                var temp = A[k][j];
                A[k][j] = A[maxIndex][j];
                A[maxIndex][j] = temp;
            }
            var temp = b[k];
            b[k] = b[maxIndex];
            b[maxIndex] = temp;
        }
        // Se A[k][k] é zero, então a matriz dos coeficientes é singular (det A = 0)
        if(A[k][k] == 0){
            return null;
        }else{
            // Realiza o escalonamento
            for(m = k + 1; m < A.length; m++){
                var F = -A[m][k] / A[k][k];
                A[m][k] = 0; // Evita uma iteração desnecessária
                b[m] = b[m] + F * b[k];
                for(l = k + 1; l < A.length; l++){
                    A[m][l] = A[m][l] + F * A[k][l];
                }
            }
        }
    }

    // etapa de resolução do sistema
    var X = [];
    for(i = A.length - 1; i >= 0; i--){
        X[i] = b[i];
        for(j = i + 1; j < A.length; j++){
            X[i] = X[i] - X[j] * A[i][j];
        }
        X[i] = X[i] / A[i][i];
    }

    return X;
}

const bttCalc = document.querySelector('#bttCalc');
bttCalc.addEventListener('click', function() {
    // Coeficientes e termos independentes das equações lineares
    // Coluna 1
    const a11 = parseFloat(document.querySelector('#a11').value);
    const a12 = parseFloat(document.querySelector('#a12').value);
    const a13 = parseFloat(document.querySelector('#a13').value);
    const b11 = parseFloat(document.querySelector('#b11').value);

    // Coluna 2
    const a21 = parseFloat(document.querySelector('#a21').value);
    const a22 = parseFloat(document.querySelector('#a22').value);
    const a23 = parseFloat(document.querySelector('#a23').value);
    const b22 = parseFloat(document.querySelector('#b22').value);

    // Coluna 3
    const a31 = parseFloat(document.querySelector('#a31').value);
    const a32 = parseFloat(document.querySelector('#a32').value);
    const a33 = parseFloat(document.querySelector('#a33').value);
    const b33 = parseFloat(document.querySelector('#b33').value);

    console.log(a11, a12, a13, b11);
    console.log(a21, a22, a23, b22);
    console.log(a31, a32, a33, b33);

    // Método Gauss
    const A = [[a11, a12, a13], [a21, a22, a23], [a31, a32, a33]];
    const b = [b11, b22, b33];
    const gaussResult = gaussSolver(A, b);

    const xGauss = gaussResult[0];
    const yGauss = gaussResult[1];
    const zGauss = gaussResult[2];

    console.log("Resultado Gauss:");
    console.log("x =", xGauss);
    console.log("y =", yGauss);
    console.log("z =", zGauss);

    // Método Gauss-Seidel
    let xSeidel = 0;
    let ySeidel = 0;
    let zSeidel = 0;
    let iterations = 10;

    for (let i = 0; i < iterations; i++) {
        const xSeidelNext = (b11 - a12 * ySeidel - a13 * zSeidel) / a11;
        const ySeidelNext = (b22 - a21 * xSeidelNext - a23 * zSeidel) / a22;
        const zSeidelNext = (b33 - a31 * xSeidelNext - a32 * ySeidelNext) / a33;

        xSeidel = xSeidelNext;
        ySeidel = ySeidelNext;
        zSeidel = zSeidelNext;
    }

    console.log("Resultado Gauss-Seidel:");
    console.log("x =", xSeidel);
    console.log("y =", ySeidel);
    console.log("z =", zSeidel);

    // Exibindo o resultado na página
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <h2>Resultado</h2>
        <p>Método Gauss:</p>
        <p>x = ${xGauss}</p>
        <p>y = ${yGauss}</p>
        <p>z = ${zGauss}</p>
        <p>Método Gauss-Seidel:</p>
        <p>x = ${xSeidel}</p>
        <p>y = ${ySeidel}</p>
        <p>z = ${zSeidel}</p>
    `;
});
