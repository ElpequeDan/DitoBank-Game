<script>
        const questions = [
                // Preguntas originales
                {
                        question: "¿Qué es una cartera de criptomonedas?",
                        options: ["Un lugar para guardar claves privadas", "Un banco digital", "Una tarjeta de crédito", "Un cajero automático"],
                        answer: "Un lugar para guardar claves privadas"
                },
                {
                        question: "¿Qué es una cartera fría?",
                        options: ["Una cartera conectada a internet", "Una cartera desconectada de internet", "Una aplicación móvil", "Un tipo de préstamo"],
                        answer: "Una cartera desconectada de internet"
                },
                {
                        question: "¿Cuál es el suministro máximo de Bitcoin?",
                        options: ["100 millones", "21 millones", "1 millón", "50 millones"],
                        answer: "21 millones"
                },
                {
                        question: "¿Qué es un fondo de emergencia?",
                        options: ["Un préstamo rápido", "Dinero ahorrado para imprevistos", "Una inversión en criptos", "Un pago de tarjeta"],
                        answer: "Dinero ahorrado para imprevistos"
                },
                {
                        question: "¿Qué es una seed phrase?",
                        options: ["Una contraseña temporal", "Una serie de palabras para recuperar una cartera", "Una app de trading", "Un código QR"],
                        answer: "Una serie de palabras para recuperar una cartera"
                },
                // Preguntas adicionales generadas
                {
                        question: "¿Qué es una stablecoin?",
                        options: ["Una criptomoneda que mantiene un valor estable", "Una criptomoneda altamente volátil", "Un tipo de préstamo bancario", "Una acción financiera"],
                        answer: "Una criptomoneda que mantiene un valor estable"
                },
                {
                        question: "¿Qué significa diversificar tus inversiones?",
                        options: ["Invertir en un solo activo", "Repartir tus inversiones en diferentes activos", "Comprar solo criptomonedas", "Guardar todo en efectivo"],
                        answer: "Repartir tus inversiones en diferentes activos"
                },
                {
                        question: "¿Qué es un NFT?",
                        options: ["Un archivo PDF", "Un token no fungible", "Un tipo de préstamo", "Un banco digital"],
                        answer: "Un token no fungible"
                },
                {
                        question: "¿Qué es la blockchain?",
                        options: ["Una base de datos distribuida y segura", "Una tarjeta de crédito", "Una tienda en línea", "Un tipo de inversión tradicional"],
                        answer: "Una base de datos distribuida y segura"
                },
                {
                        question: "¿Qué significa ahorrar?",
                        options: ["Gastar más de lo que ganas", "Reservar una parte de tus ingresos", "Invertir en acciones", "Usar solo tarjetas de crédito"],
                        answer: "Reservar una parte de tus ingresos"
                },
                {
                        question: "¿Qué es la inflación?",
                        options: ["El aumento general de precios", "Una criptomoneda", "Un ahorro protegido", "Una aplicación financiera"],
                        answer: "El aumento general de precios"
                },
                // Más preguntas
                {
                        question: "¿Qué es el interés compuesto?",
                        options: ["Interés que se calcula solo sobre el capital inicial", "Interés que se calcula sobre el capital más los intereses acumulados", "Un tipo de impuesto", "Una comisión bancaria"],
                        answer: "Interés que se calcula sobre el capital más los intereses acumulados"
                },
                {
                        question: "¿Qué es la minería de criptomonedas?",
                        options: ["Extraer metales preciosos", "Proceso de validar transacciones en una blockchain", "Crear nuevas criptomonedas sin verificación", "Comprar criptomonedas a bajo precio"],
                        answer: "Proceso de validar transacciones en una blockchain"
                },
                {
                        question: "¿Qué es un contrato inteligente?",
                        options: ["Un contrato firmado electrónicamente", "Un programa que se ejecuta automáticamente en la blockchain", "Un seguro financiero", "Un préstamo de bajo interés"],
                        answer: "Un programa que se ejecuta automáticamente en la blockchain"
                },
                {
                        question: "¿Qué es DeFi?",
                        options: ["Finanzas descentralizadas", "Un tipo de criptomoneda", "Un banco digital", "Finanzas dependientes"],
                        answer: "Finanzas descentralizadas"
                }
        ];

        let currentQuestion = 0;
        let lives = 3;
        let xp = 0;
        let totalXP = 0;
        let playerName = "";
        let playerEmail = "";
        let userLevel = 1;
        const MAX_XP = 100;
        const QUESTIONS_PER_TURN = 5;
        const TOTAL_TURNS = 3;
        let currentTurn = 1;
        let currentQuestionInTurn = 1;
        let correctAnswers = 0;
        let turnCorrectAnswers = 0;

        function startGame() {
        // Obtener los valores del jugador o usar los guardados
        const inputName = document.getElementById('player-name').value.trim();
        const inputEmail = document.getElementById('player-email').value.trim();

        if (inputName !== "") {
                playerName = inputName;
                playerEmail = inputEmail;
        } else if (!loadGameState()) {
                // Si no hay nombre y no hay estado guardado
                return alert("Por favor, ingresa tu nombre.");
        }

        document.getElementById('start-screen').style.display = "none";
        document.getElementById('game-container').style.display = "block";
        document.getElementById('result-screen').style.display = "none";
        document.getElementById('turn-complete').style.display = "none";
        document.getElementById('home-button').style.display = "block";

        // Configurar información de usuario
        document.getElementById('user-name').innerText = playerName;
        document.getElementById('user-email').innerText = playerEmail || "";
        document.getElementById('user-avatar').innerText = playerName.charAt(0).toUpperCase();

        // Configurar información de turno
        document.getElementById('current-turn').innerText = currentTurn;
        document.getElementById('total-turns').innerText = TOTAL_TURNS;
        document.getElementById('current-question-turn').innerText = currentQuestionInTurn;

        // Actualizar todas las estadísticas
        updateXP();
        updateTotalXP();
        updateLives();
        updateLevel();
        updateProgress();

        // Si es una partida nueva, mezclar las preguntas
        if (currentQuestion === 0) {
                shuffleArray(questions);
        }

        loadQuestion();
}

        function resetGame() {
                // Mezclar las preguntas al inicio del juego
                shuffleArray(questions);

                currentQuestion = 0;
                lives = 3;
                xp = 0;
                totalXP = 0;
                correctAnswers = 0;
                currentTurn = 1;
                currentQuestionInTurn = 1;
                turnCorrectAnswers = 0;
                userLevel = 1;

                updateXP();
                updateTotalXP();
                updateLives();
                updateLevel();

                document.getElementById('current-turn').innerText = currentTurn;
                document.getElementById('current-question-turn').innerText = currentQuestionInTurn;
        }

        function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [array[i], array[j]] = [array[j], array[i]];
                }
        }

        function restartGame() {
                // Mostrar la interfaz del juego nuevamente
                document.getElementById('question').style.display = "block";
                document.getElementById('answers').style.display = "grid";
                document.getElementById('result-screen').style.display = "none";
                document.getElementById('turn-complete').style.display = "none";

                // Reiniciar todas las variables del juego
                resetGame();

                // Cargar la primera pregunta
                loadQuestion();
        }

        function nextTurn() {
                currentTurn++;
                currentQuestionInTurn = 1;
                xp = 0;
                turnCorrectAnswers = 0;
                lives = 3;

                document.getElementById('current-turn').innerText = currentTurn;
                document.getElementById('current-question-turn').innerText = currentQuestionInTurn;
                updateXP();
                updateLives();

                document.getElementById('turn-complete').style.display = "none";
                document.getElementById('question').style.display = "block";
                document.getElementById('answers').style.display = "grid";

                loadQuestion();
                saveGameState();
        }

        function loadQuestion() {
                if (lives === 0) {
                        showResults(false);
                        return;
                }

                if (currentTurn > TOTAL_TURNS) {
                        showResults(true);
                        return;
                }

                if (currentQuestionInTurn > QUESTIONS_PER_TURN) {
                        showTurnComplete();
                        return;
                }

                // Asegurar que no nos quedemos sin preguntas
                if (currentQuestion >= questions.length) {
                        // Si nos quedamos sin preguntas, volver a mezclar
                        shuffleArray(questions);
                        currentQuestion = 0;
                }

                const q = questions[currentQuestion];
                document.getElementById('question').innerText = q.question;
                const answersDiv = document.getElementById('answers');
                answersDiv.innerHTML = "";

                // Shuffle options
                const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);

                shuffledOptions.forEach(option => {
                        const btn = document.createElement('button');
                        btn.innerText = option;
                        btn.onclick = () => checkAnswer(option);
                        answersDiv.appendChild(btn);
                });

                updateProgress();
        }

        function checkAnswer(selected) {
                const correct = selected === questions[currentQuestion].answer;

                if (correct) {
                        xp += 20;
                        totalXP += 20;
                        correctAnswers++;
                        turnCorrectAnswers++;
                        updateXP();
                        updateTotalXP();
                        updateLevel();
                        saveGameState();

                        // Create a temporary "Correct!" message
                        const feedback = document.createElement('div');
                        feedback.innerText = "¡Correcto! +20 XP";
                        feedback.style.color = "green";
                        feedback.style.fontWeight = "bold";
                        feedback.style.fontSize = "18px";
                        feedback.style.margin = "10px 0";
                        document.getElementById('answers').appendChild(feedback);

                        setTimeout(() => {
                                currentQuestion++;
                                currentQuestionInTurn++;
                                document.getElementById('current-question-turn').innerText = currentQuestionInTurn;
                                loadQuestion();
                        }, 1000);
                } else {
                        lives--;
                        updateLives();

                        // Create a temporary "Incorrect!" message
                        const feedback = document.createElement('div');
                        feedback.innerText = "¡Incorrecto! -1 ❤️";
                        feedback.style.color = "red";
                        feedback.style.fontWeight = "bold";
                        feedback.style.fontSize = "18px";
                        feedback.style.margin = "10px 0";
                        document.getElementById('answers').appendChild(feedback);

                        setTimeout(() => {
                                currentQuestion++;
                                currentQuestionInTurn++;
                                document.getElementById('current-question-turn').innerText = currentQuestionInTurn;
                                loadQuestion();
                        }, 1000);
                }
        }

        function updateLives() {
                let hearts = "";
                for (let i = 0; i < lives; i++) {
                        hearts += "❤️";
                }
                document.getElementById('lives').innerText = hearts;
        }

        function updateXP() {
                document.getElementById('xp-value').innerText = xp;
                const xpPercent = (xp / MAX_XP) * 100;
                document.getElementById('xp-progress').style.width = `${Math.min(xpPercent, 100)}%`;
        }

        function updateTotalXP() {
                document.getElementById('total-xp-value').innerText = totalXP;

                // Para la barra de progreso total asumimos que 300 XP es el máximo (para nivel 3)
                const totalXpPercent = (totalXP / 300) * 100;
                document.getElementById('total-xp-progress').style.width = `${Math.min(totalXpPercent, 100)}%`;
        }

        function updateLevel() {
                // Sistema simple de niveles
                if (totalXP >= 200) {
                        userLevel = 3;
                } else if (totalXP >= 100) {
                        userLevel = 2;
                } else {
                        userLevel = 1;
                }

                document.getElementById('level-badge').innerText = `Nivel ${userLevel}`;
        }

        function updateProgress() {
                const progressPercent = ((currentQuestionInTurn - 1) / QUESTIONS_PER_TURN) * 100;
                document.getElementById('progress').style.width = `${progressPercent}%`;
        }

        function showTurnComplete() {
                const turnComplete = document.getElementById('turn-complete');
                const turnInfo = document.getElementById('turn-info');
                const turnScore = document.getElementById('turn-score');

                turnComplete.style.display = "block";
                document.getElementById('question').style.display = "none";
                document.getElementById('answers').style.display = "none";

                turnInfo.innerText = `Has completado el turno ${currentTurn} de ${TOTAL_TURNS}.`;
                turnScore.innerText = `Puntuación del turno: ${xp} XP | Respuestas correctas: ${turnCorrectAnswers}/${QUESTIONS_PER_TURN}`;
        }

        function showResults(completed) {
                const resultScreen = document.getElementById('result-screen');
                saveGameState();
                const resultTitle = document.getElementById('result-title');
                const resultInfo = document.getElementById('result-info');
                const finalScore = document.getElementById('final-score');

                resultScreen.style.display = "block";
                document.getElementById('question').style.display = "none";
                document.getElementById('answers').style.display = "none";
                document.getElementById('turn-complete').style.display = "none";

                if (completed) {
                        resultTitle.innerText = "¡Felicidades!";
                        resultInfo.innerText = `Has completado todos los turnos, ${playerName}. Tus conocimientos en finanzas y criptomonedas son impresionantes.`;
                } else {
                        resultTitle.innerText = "Juego terminado";
                        resultInfo.innerText = `Has agotado todas tus vidas, ${playerName}. Inténtalo de nuevo para mejorar tu puntuación.`;
                }

                const totalPossibleQuestions = QUESTIONS_PER_TURN * TOTAL_TURNS;
                finalScore.innerText = `Puntuación final: ${totalXP} XP | Nivel: ${userLevel} | Respuestas correctas: ${correctAnswers}/${currentQuestion}`;
        }
            // Función para guardar la experiencia en localStorage
function saveGameState() {
        const gameState = {
                playerName: playerName,
                playerEmail: playerEmail,
                totalXP: totalXP,
                userLevel: userLevel,
                currentTurn: currentTurn,
                currentQuestionInTurn: currentQuestionInTurn,
                lives: lives,
                xp: xp,
                correctAnswers: correctAnswers,
                turnCorrectAnswers: turnCorrectAnswers
        };
        localStorage.setItem('ditobanxGameState', JSON.stringify(gameState));
}

// Función para cargar la experiencia de localStorage
function loadGameState() {
        const savedState = localStorage.getItem('ditobanxGameState');
        if (savedState) {
                const gameState = JSON.parse(savedState);
                playerName = gameState.playerName;
                playerEmail = gameState.playerEmail;
                totalXP = gameState.totalXP;
                userLevel = gameState.userLevel;
                currentTurn = gameState.currentTurn;
                currentQuestionInTurn = gameState.currentQuestionInTurn;
                lives = gameState.lives;
                xp = gameState.xp;
                correctAnswers = gameState.correctAnswers;
                turnCorrectAnswers = gameState.turnCorrectAnswers;

                return true;
        }
        return false;
}

// Función para volver a la pantalla de inicio
function goHome() {
        // Guardar el estado actual antes de volver al inicio
        saveGameState();

        // Mostrar la pantalla de inicio y ocultar el juego
        document.getElementById('start-screen').style.display = "flex";
        document.getElementById('game-container').style.display = "none";
        document.getElementById('home-button').style.display = "none";

        // Actualizar el texto del botón de inicio para reflejar continuar/nuevo juego
        const startButton = document.querySelector('#start-screen .btn');
        startButton.innerText = "Continuar juego";

        // Añadir un botón para empezar un juego nuevo
        if (!document.getElementById('new-game-btn')) {
                const newGameBtn = document.createElement('button');
                newGameBtn.id = 'new-game-btn';
                newGameBtn.className = 'btn';
                newGameBtn.style.backgroundColor = '#666';
                newGameBtn.style.marginTop = '10px';
                newGameBtn.innerText = "Nuevo juego";
                newGameBtn.onclick = function() {
                        localStorage.removeItem('ditobanxGameState');
                        window.location.reload();
                };
                document.getElementById('start-screen').appendChild(newGameBtn);
        }
}
</script>