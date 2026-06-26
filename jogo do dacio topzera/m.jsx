const { useState } = React;

function App() {
    const tamanho = 25;

    const minas = [4, 12, 19];

    const [revelados, setRevelados] = useState([]);
    const [perdeu, setPerdeu] = useState(false);
    const [mensagem, setMensagem] = useState("Encontre as casas seguras, evite as 3 minas!");

    function revelar(posicao) {
        if (revelados.includes(posicao) || perdeu) return;

        const novosRevelados = [...revelados, posicao];
        setRevelados(novosRevelados);

        if (minas.includes(posicao)) {
            setPerdeu(true);
            setMensagem("Você perdeu! 💥");
            return;
        }

        const seguras = novosRevelados.filter(c =>
            !minas.includes(c)
        ).length;

        if (seguras === tamanho - minas.length) {
            setMensagem("Você venceu!");
        }
    }

    return (
        <div>
            <h1>Campo Minado</h1>
            <p>{mensagem}</p>

            <div className="tab">
                {Array.from({ length: tamanho }).map((_, i) => {
                    const revelado = revelados.includes(i);
                    const mina = minas.includes(i);

                    let classe = "celula";
                    let texto = "❓";

                    if (revelado) {
                        if (mina) {
                            texto = "💣";
                            classe += " erro";
                        } else {
                            texto = "✅";
                            classe += " acerto";
                        }
                    } else if (perdeu && mina) {
                        texto = "💣";
                        classe += " erro";
                    }

                    return (
                        <button
                            key={i}
                            className={classe}
                            onClick={() => revelar(i)}
                        >
                            {texto}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

ReactDOM.createRoot(
    document.getElementById("root")
).render(<App />);
