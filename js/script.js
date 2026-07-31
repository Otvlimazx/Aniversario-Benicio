/* ==========================================================
   BENÍCIO - 3 ANOS
   SCRIPT.JS - PARTE 1

   Controle:
   - Entrada da festa
   - Música
   - Balões
   - Partículas de fundo

========================================================== */


/* ==========================================================
   CONFIGURAÇÕES GERAIS
========================================================== */


document.addEventListener("DOMContentLoaded",()=>{


    console.log("🎉 Site do Benício carregado com sucesso!");



    /* ======================================================
       ELEMENTOS PRINCIPAIS
    ====================================================== */


    const opening = document.getElementById("opening");

    const enterButton = document.getElementById("enterSite");


    const music = document.getElementById("music");

    const musicButton = document.getElementById("musicButton");



    const balloons = document.getElementById("balloons");

    const particles = document.getElementById("particles");



    let musicPlaying = false;



    /* ======================================================
       ENTRADA DA FESTA
    ====================================================== */


    if(enterButton){


        enterButton.addEventListener("click",()=>{


            // Esconde a tela inicial com efeito suave

            opening.style.transition="1.2s ease";

            opening.style.opacity="0";


            setTimeout(()=>{


                opening.style.display="none";


                // tenta iniciar música

                iniciarMusica();


                // cria uma explosão inicial de comemoração

                criarConfetesEntrada();


            },1200);



        });


    }



    /* ======================================================
       CONTROLE DA MÚSICA
    ====================================================== */


    function iniciarMusica(){


        if(!music) return;


        music.volume = 0.45;



        music.play()

        .then(()=>{


            musicPlaying=true;

            atualizarIconeMusica();



        })

        .catch(()=>{


            console.log("O navegador bloqueou o autoplay.");

        });



    }



    if(musicButton){



        musicButton.addEventListener("click",()=>{


            if(!music) return;



            if(musicPlaying){


                music.pause();

                musicPlaying=false;



            }else{


                music.play();

                musicPlaying=true;



            }



            atualizarIconeMusica();



        });



    }



    function atualizarIconeMusica(){


        const icon = musicButton?.querySelector("i");


        if(!icon) return;



        if(musicPlaying){


            icon.className="fa-solid fa-volume-high";


        }else{


            icon.className="fa-solid fa-volume-xmark";


        }



    }




    /* ======================================================
       CRIAÇÃO DOS BALÕES
    ====================================================== */


    function criarBaloes(){



        if(!balloons) return;



        const cores=[

            "#FF5DA2",

            "#5B5FEF",

            "#FFB703",

            "#45D483",

            "#5FD1FF"

        ];



        for(let i=0;i<18;i++){



            const balloon=document.createElement("div");


            balloon.classList.add("balloon");



            balloon.style.left=Math.random()*100+"%";


            balloon.style.background=

            cores[
                Math.floor(Math.random()*cores.length)
            ];



            balloon.style.animationDuration=

            (12 + Math.random()*15)+"s";



            balloon.style.animationDelay=

            (Math.random()*10)+"s";



            balloon.style.transform=

            `scale(${0.6 + Math.random()*0.7})`;



            balloons.appendChild(balloon);



        }



    }



    criarBaloes();




    /* ======================================================
       PARTÍCULAS DE FUNDO
    ====================================================== */


    function criarParticulas(){



        if(!particles) return;



        for(let i=0;i<80;i++){



            const particle=document.createElement("span");



            particle.style.position="absolute";


            particle.style.width=

            Math.random()*5+2+"px";



            particle.style.height=

            particle.style.width;



            particle.style.background=

            "rgba(255,255,255,.7)";



            particle.style.borderRadius="50%";



            particle.style.left=

            Math.random()*100+"%";



            particle.style.top=

            Math.random()*100+"%";



            particle.style.animation=

            `flutuar ${
                3+Math.random()*6
            }s ease-in-out infinite`;



            particle.style.animationDelay=

            Math.random()*5+"s";



            particles.appendChild(particle);



        }



    }



    criarParticulas();



});

/* ==========================================================
   BENÍCIO - 3 ANOS
   SCRIPT.JS - PARTE 2

   Controle:
   - Confetes
   - Animações ao rolar página
   - Lightbox da galeria

========================================================== */


/* ==========================================================
   CONFETES NO CANVAS
========================================================== */


document.addEventListener("DOMContentLoaded",()=>{


    const canvas = document.getElementById("confettiCanvas");


    if(canvas){


        const ctx = canvas.getContext("2d");


        let confetes=[];



        function ajustarCanvas(){


            canvas.width = window.innerWidth;

            canvas.height = window.innerHeight;


        }


        ajustarCanvas();


        window.addEventListener("resize",ajustarCanvas);




        function criarConfetesEntrada(){


            confetes=[];



            const cores=[

                "#FF5DA2",

                "#5B5FEF",

                "#FFB703",

                "#45D483",

                "#FFFFFF"

            ];



            for(let i=0;i<180;i++){


                confetes.push({


                    x:canvas.width/2,


                    y:canvas.height/2,



                    tamanho:
                    Math.random()*8+4,



                    velocidadeX:
                    (Math.random()-0.5)*12,



                    velocidadeY:
                    (Math.random()-0.8)*15,



                    gravidade:.35,



                    rotacao:
                    Math.random()*360,



                    cor:
                    cores[
                        Math.floor(
                            Math.random()*cores.length
                        )
                    ]



                });



            }



            animarConfetes();



        }




        function animarConfetes(){



            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );



            confetes.forEach((c)=>{



                c.x += c.velocidadeX;


                c.y += c.velocidadeY;


                c.velocidadeY += c.gravidade;



                c.rotacao += 5;




                ctx.save();



                ctx.translate(
                    c.x,
                    c.y
                );



                ctx.rotate(
                    c.rotacao*Math.PI/180
                );



                ctx.fillStyle=c.cor;



                ctx.fillRect(

                    -c.tamanho/2,

                    -c.tamanho/2,

                    c.tamanho,

                    c.tamanho

                );



                ctx.restore();



            });



            confetes = confetes.filter(

                c=>c.y < canvas.height+100

            );



            if(confetes.length){


                requestAnimationFrame(animarConfetes);


            }



        }



        // deixa disponível para o botão inicial

        window.criarConfetesEntrada = criarConfetesEntrada;



    }





});




/* ==========================================================
   ANIMAÇÃO DOS ELEMENTOS NO SCROLL
========================================================== */


document.addEventListener("DOMContentLoaded",()=>{


    const elementos=[


        ...document.querySelectorAll(".timeline-item"),


        ...document.querySelectorAll(".photo-card"),


        ...document.querySelectorAll(".timeline-content")


    ];



    const observador = new IntersectionObserver((entradas)=>{


        entradas.forEach((entrada)=>{



            if(entrada.isIntersecting){



                entrada.target.style.opacity="1";


                entrada.target.style.transform="translateY(0)";



                observador.unobserve(
                    entrada.target
                );



            }



        });



    },{


        threshold:.15


    });




    elementos.forEach((elemento)=>{



        elemento.style.opacity="0";


        elemento.style.transform="translateY(70px)";


        elemento.style.transition="1s ease";



        observador.observe(elemento);



    });



});




/* ==========================================================
   LIGHTBOX DA GALERIA
========================================================== */


document.addEventListener("DOMContentLoaded",()=>{



    const lightbox=document.getElementById("lightbox");


    const lightboxImage=document.getElementById("lightboxImage");


    const lightboxCaption=document.getElementById("lightboxCaption");


    const closeLightbox=document.getElementById("closeLightbox");



    const fotos=document.querySelectorAll(".photo-card img");



    if(!lightbox) return;



    fotos.forEach((foto)=>{



        foto.addEventListener("click",()=>{



            const card=foto.closest(".photo-card");



            const titulo=

            card.querySelector("h3")?.innerText || "";



            const texto=

            card.querySelector("p")?.innerText || "";



            lightboxImage.src=foto.src;



            lightboxCaption.innerHTML=

            `<strong>${titulo}</strong><br><br>${texto}`;



            lightbox.style.display="flex";



            setTimeout(()=>{


                lightbox.style.opacity="1";


            },20);



        });



    });




    function fecharLightbox(){



        lightbox.style.opacity="0";



        setTimeout(()=>{


            lightbox.style.display="none";


        },400);



    }




    closeLightbox?.addEventListener(

        "click",

        fecharLightbox

    );




    lightbox.addEventListener("click",(e)=>{


        if(e.target===lightbox){


            fecharLightbox();


        }


    });



    document.addEventListener("keydown",(e)=>{



        if(e.key==="Escape"){



            fecharLightbox();



        }



    });



});

/* ==========================================================
   BENÍCIO - 3 ANOS
   SCRIPT.JS - PARTE 3

   Controle:
   - Contador de aniversário
   - Ajustes finais
   - Proteções
   - Inicialização

========================================================== */



document.addEventListener("DOMContentLoaded",()=>{



    /* ======================================================
       CONTADOR DE ANIVERSÁRIO
    ====================================================== */


    const days = document.getElementById("days");

    const hours = document.getElementById("hours");

    const minutes = document.getElementById("minutes");

    const seconds = document.getElementById("seconds");



    if(days && hours && minutes && seconds){



        // Próximo aniversário do Benício

        const aniversario = new Date(
            "July 31, 2026 00:00:00"
        ).getTime();




        function atualizarContador(){



            const agora = new Date().getTime();



            const distancia = aniversario - agora;



            if(distancia <= 0){



                days.innerHTML="0";

                hours.innerHTML="0";

                minutes.innerHTML="0";

                seconds.innerHTML="0";


                return;


            }




            const dia =

            Math.floor(

                distancia /

                (1000*60*60*24)

            );



            const hora =

            Math.floor(

                (distancia %

                (1000*60*60*24))

                /

                (1000*60*60)

            );



            const minuto =

            Math.floor(

                (distancia %

                (1000*60*60))

                /

                (1000*60)

            );



            const segundo =

            Math.floor(

                (distancia %

                (1000*60))

                /

                1000

            );




            days.innerHTML=dia;

            hours.innerHTML=hora;

            minutes.innerHTML=minuto;

            seconds.innerHTML=segundo;



        }



        atualizarContador();



        setInterval(

            atualizarContador,

            1000

        );



    }




    /* ======================================================
       EFEITO DE DIGITAÇÃO SUAVE NO HERO
    ====================================================== */


    const heroText = document.querySelector(

        ".hero-text p"

    );



    if(heroText){



        const textoOriginal = heroText.innerText;



        heroText.innerText="";



        let index=0;



        function digitar(){



            if(index < textoOriginal.length){



                heroText.innerHTML +=

                textoOriginal[index];



                index++;



                setTimeout(

                    digitar,

                    25

                );



            }



        }




        setTimeout(

            digitar,

            1500

        );



    }




    /* ======================================================
       MOVIMENTO PARALLAX SUAVE
    ====================================================== */


    const hero = document.getElementById("hero");



    window.addEventListener("scroll",()=>{



        if(!hero) return;



        let movimento =

        window.scrollY * 0.15;



        hero.style.transform=

        `translateY(${movimento}px)`;



    });




    /* ======================================================
       PREVENÇÃO DE ERROS NAS IMAGENS
    ====================================================== */


    const imagens = document.querySelectorAll("img");



    imagens.forEach((imagem)=>{



        imagem.addEventListener(

            "error",

            ()=>{


                imagem.style.opacity="0.3";


                console.warn(

                    "Imagem não encontrada:",

                    imagem.src

                );


            }


        );



    });




    /* ======================================================
       ANO AUTOMÁTICO NO FOOTER
    ====================================================== */


    const footer = document.querySelector("footer");



    if(footer){



        const ano = new Date().getFullYear();



        const texto = document.createElement("small");



        texto.style.display="block";


        texto.style.marginTop="20px";


        texto.style.opacity=".7";



        texto.innerHTML=

        `© ${ano} • Feito com amor ❤️`;



        footer.appendChild(texto);



    }



    /* ======================================================
       FINALIZAÇÃO
    ====================================================== */


    console.log(

        "❤️ Todas as funções do site Benício foram ativadas!"

    );



});