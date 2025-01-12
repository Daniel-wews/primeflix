import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from '../../services/api'
import './filme.css'
import { toast } from "react-toastify"

export default function Filme() {
    const { id } = useParams();
    const navigate  = useNavigate()
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadfilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "04ef14498df2f0f341096486eb13b7e0",
                    language: 'pt-BR',
                    page: 1,
                }
            })
                .then((response) => {
                    setFilme(response.data)
                    setLoading(false)
                })
                .catch(() => {
                    console.log('filme nao encontrado');
                    navigate('/', {replace:true})
                    return;
                })
        }
        loadfilme()

        return () => {
            console.log('componente foi desmontado')
        }
    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo
    .id === filme.id)

    if(hasFilme){
        toast.warm("Esse filme já esta na sua lista")
        return
    }

    filmesSalvos.push(filme);
    localStorage.setItem('@primeflix',JSON.stringify(filmesSalvos));
    toast.success("filme salvo com sucesso!")

    }

    if (loading) {
        return (
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }
    return (
        <>
            <div className="filme-info">
                <h1>{filme.title}</h1>
                <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
                <h3>Sinopse</h3>
                <span>{filme.overview}</span>

                <strong>Avaliação: {filme.vote_average} / 10</strong>

                <div className="area-buttons">
                    <button onClick={salvarFilme}>Salvar</button>
                    <button>
                        <a target="_blank" rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                            Trailer
                        </a>
                    </button>
                </div>
            </div>
        </>
    )
}