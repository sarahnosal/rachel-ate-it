
function About() {

    return (
        <div className="about">
            <div className="rachel" >
                <img src='/image/rachel.jpeg' alt='rachel' />
            </div>
            <div className="contact">
                <h2 id='contact'>Contact Me:</h2>
                <div className="socialMediaLinks">
                    <a  href='https://www.instagram.com/rachelateit/' target='_blank' rel="noreferrer"><img src='/image/ig.jpeg' alt='iglogo' style={{width: 60, height: 60}}/></a>
                    <p className= 'ig'>@rachelateit</p>
                </div>
                <p className="email">Email: rachel@rachelateit.com</p>
                <div className="bio">
                    <p>I am a classically trained pastry chef, having studied at FERRANDI Paris for 6 months in the fall of 2020! Feel free to checkout what I've eaten and what I've made, and let me know if you'd like anything made for you!</p>
                </div>
            </div>
            <div className="lol">
                <p>"She's the next Amaury Guichon!"   &nbsp;&nbsp;&nbsp;-Everyone</p>
            </div>

        </div>
    )
}

export default About