import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin =async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', { 
                email, 
                password 
            });
            if(response.data.token){
                localStorage.setItem('token', response.data.token);
                navigate('/usuarios/agregar');
            }
        } catch (error) {
            setError('No tiene acceso al sistema.');
        }
    };

    return(
        <div>
            <h2>
                Iniciar Sesión                
            </h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label for="email">Correo Electrónico</label>
                    <input 
                        type="email" 
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label for="password">Contraseña</label>
                    <input 
                        type="password" 
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Acceder</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '50px'
    },
    error: {
        color:'red',
        marginBottom: '20px'
    }
}