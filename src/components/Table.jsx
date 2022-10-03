import React, { useState } from 'react';
import rockImage from '.././images/rock.png';
import paperImage from '.././images/paper.png';
import scissorImage from '.././images/scissor.png';

const Table = () => {

    const options = ['Rock', 'Paper', 'Scissor'];
    const [gameRounds, setGamerounds] = useState(3)
    const [message, setMessage] = useState('Start Playing!');
    const [game , setGame] = useState({ 
        player : 0, 
        computer : 0, 
        roundsPlayed : 0,
        rounds : gameRounds
    });
    
    const Play = (ev) => {

        // check if not last round
        if(gameRounds === 0){
            console.log('No rounds left');
            return;
        }

        const randomOption = options[Math.floor(Math.random()*options.length)];
        const round = { player : ev, computer : randomOption };
        
        if(!ev.target.value){ // user clicked on the image
            // get selected value from image 'Alt'
            round.player = ev.target.alt;
        }else{ // else use title
            round.player = ev.target.title;
        }

        return checkRound(round);
    }


    const checkRound = (options) => {

        if(options && options.player && options.computer){

            const { player, computer } = options;

            if(player === computer){
                console.log('TIE');
                setMessage('TIE');
                return;
            }else{

                setGamerounds(gameRounds-1);
                game.roundsPlayed++;

                console.log('Rounds ' + gameRounds);

                switch(player){
                    case 'Rock' :
                        if(computer === 'Paper'){
                            setMessage('You Lost (Paper)');
                            game.computer++;
                        }
                        else if(computer === 'Scissor'){
                            setMessage('You WIN (Scissor)');
                            game.player++;
                        }

                        break;

                    case 'Paper' :
                        if(computer === 'Scissor'){
                            setMessage('You Lost (Scissor)');
                            game.computer++;
                        }else if(computer === 'Rock'){
                            setMessage('You WIN (Rock)');
                            game.player++;
                        }

                        break;
                    
                    case 'Scissor' :
                        if(computer === "Rock"){
                            setMessage('You Lost (Rock)');
                            game.computer++;
                        }else if(computer === 'Paper'){
                            setMessage('You WIN (Paper)');
                            game.player++;
                        }

                        break;
                    
                    default: break;
                }

            }

        }
        
        return finalizeRound();

    }

    const finalizeRound = () => {
        console.log('Finalyze...', game);

        if(game.roundsPlayed === game.rounds){
            const {player, computer} = game;
            if(player > computer){
                setMessage('Congratulations, You WON!');
            }else{
                setMessage('Computer WON, Better luck next time')
            }
        }
    }
    

    return (
        <div>
            <section>

                <button onClick={Play} className='options rock' value='1' color='#f16450' title='Rock'>
                    <img src={rockImage} alt='Rock' />
                </button>

                <button onClick={Play} className='options paper' value='2' color='#62bcba' title='Paper'>
                    <img src={paperImage} alt='Paper' />
                </button>

                <button onClick={Play} className='options scissor' value='3' color='#f5bc49' title='Scissor'>
                    <img src={scissorImage} alt='Scissor' />
                </button>

            </section>

            <h3><b> { message } </b></h3>
            {
                // Check if we started playing and not last round
                game.roundsPlayed > 0 && gameRounds > 0 ?

                <div>
                    <hr />
                    <p> You: <b>{ game.player }</b>, Computer: <b>{ game.computer }</b> </p>
                    <p> Rounds Left: <b>{ gameRounds }/3</b>  </p>  
                </div>
                : ''
            }
         
        </div>
    )
}
export default Table;