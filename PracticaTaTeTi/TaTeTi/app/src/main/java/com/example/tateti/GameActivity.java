package com.example.tateti;

import android.annotation.SuppressLint;
import android.os.*;
import android.view.View;
import android.widget.*;
import androidx.appcompat.app.AppCompatActivity;

public class GameActivity extends AppCompatActivity {

    TextView lblJugador, lblGanador;

    Button btnCentro, btnCentroArriba, btnCentroAbajo, btnCentroIzquierda,
            btnCentroDerecha, btnArribaDerecha, btnArribaIzquierda, btnAbajoIzquierda, btnAbajoDerecha, Reiniciar;

    String nombre,usa;

    boolean tengoTurno;

    ControlJuego cj;

    @Override
    protected void onCreate(Bundle SavedInstanceState){
        super.onCreate(SavedInstanceState);
        setContentView(R.layout.activity_game);
        tengoTurno = true;
        nombre = getIntent().getStringExtra("nombre"); // Geteo el intent y luego su valor en el atributo nombre.
        usa = getIntent().getStringExtra("usa");
        cj = new ControlJuego();
        cj.inicializarTablero();

        lblJugador = (TextView) findViewById(R.id.lblJugador);
        lblJugador.setText(nombre + " juega con " + usa);
        btnArribaIzquierda = (Button) findViewById(R.id.btnArribaIzquierda);
        btnCentroArriba = (Button) findViewById(R.id.btnCentroArriba);
        btnArribaDerecha = (Button) findViewById(R.id.btnArribaDerecha);
        btnCentroIzquierda = (Button) findViewById(R.id.btnCentroIzquierda);
        btnCentro = (Button) findViewById(R.id.btnCentro);
        btnCentroDerecha = (Button) findViewById(R.id.btnCentroDerecha);
        btnAbajoIzquierda = (Button) findViewById(R.id.btnAbajoIzquierda);
        btnCentroAbajo = (Button) findViewById(R.id.btnCentroAbajo);
        btnAbajoDerecha = (Button) findViewById(R.id.btnAbajoDerecha);
        lblGanador = (TextView) findViewById(R.id.lblGanador);
        Reiniciar = (Button) findViewById(R.id.btnReiniciar);

        Button[][] botones = new Button[3][3];
        botones[0][0] = btnArribaIzquierda;
        botones[0][1] = btnCentroArriba;
        botones[0][2] = btnArribaDerecha;
        botones[1][0] = btnCentroIzquierda;
        botones[1][1] = btnCentro;
        botones[1][2] = btnCentroDerecha;
        botones[2][0] = btnAbajoIzquierda;
        botones[2][1] = btnCentroAbajo;
        botones[2][2] = btnAbajoDerecha;

        btnArribaIzquierda.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v,0,0, botones, usa);}
        });

        btnCentroArriba.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v,0,1, botones, usa);}
        });

        btnArribaDerecha.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v,0,2, botones, usa);}
        });

        btnCentroIzquierda.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v,1,0, botones, usa);}
        });

        btnCentro.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v,1,1, botones, usa);}
        });

        btnCentroDerecha.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v,1,2, botones, usa);}
        });

        btnAbajoIzquierda.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v,2,0, botones, usa);}
        });

        btnCentroAbajo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v,2,1, botones, usa);}
        });

        btnAbajoDerecha.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v,2,2, botones, usa);}
        });

        Reiniciar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                for(int i=0;i < 3;i++){
                    for(int j=0;j < 3;j++){
                        botones[i][j].setText("-");
                        botones[i][j].setEnabled(true);
                        cj.reiniciar();
                        lblGanador.setText("El ganador es...");
                    }
                }
            }
        });
    }

    @SuppressLint("SetTextI18n")
    private void controloBoton(View v, int i, int j, Button[][] botones, String usa){
        if(tengoTurno) {
            Button seleccionado = (Button) v;
            if (usa.equalsIgnoreCase("circulos"))
                seleccionado.setText("O");
            else
                seleccionado.setText("X");
            tengoTurno = false;
            seleccionado.setEnabled(false);// Deshabilito el boton para que no se elija mas de una vez.
            cj.asignarValor(i,j,usa);
            if(cj.gano()) {
                lblGanador.setText("El ganador es " + nombre);
            }else if(cj.terminoEmpate())
                lblGanador.setText("El juego terminó en empate!");
            else {
                int[] numeros = cj.proximoMovimiento(usa);
                if(usa.equals("circulos")) {
                    botones[numeros[0]][numeros[1]].setText("X");
                    botones[numeros[0]][numeros[1]].setEnabled(false);
                }
                else {
                    botones[numeros[0]][numeros[1]].setText("O");
                    botones[numeros[0]][numeros[1]].setEnabled(false);
                }
                if(cj.gano())
                    lblGanador.setText("El ganador es la máquina");
                else if(cj.terminoEmpate())
                    lblGanador.setText("El juego terminó en empate!");
                tengoTurno = true;
            }
        }
    }
}
