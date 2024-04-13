package com.example.tateti;

import android.annotation.SuppressLint;
import android.os.*;
import android.view.View;
import android.widget.*;
import androidx.appcompat.app.AppCompatActivity;

public class GameActivity extends AppCompatActivity {

    TextView lblJugador, lblGanador;

    Button btnCentro, btnCentroArriba, btnCentroAbajo, btnCentroIzquierda,
            btnCentroDerecha, btnArribaDerecha, btnArribaIzquierda, btnAbajoIzquierda, btnAbajoDerecha;

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

        btnArribaIzquierda.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v);}
        });

        btnCentroArriba.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v);}
        });

        btnArribaDerecha.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v);}
        });

        btnCentroIzquierda.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v);}
        });

        btnCentro.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v);}
        });

        btnCentroDerecha.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v);}
        });

        btnAbajoIzquierda.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v);}
        });

        btnCentroAbajo.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v);}
        });

        btnAbajoDerecha.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {controloBoton(v);}
        });
    }

    @SuppressLint("SetTextI18n")
    private void controloBoton(View v){
        if(tengoTurno) {
            Button seleccionado = (Button) v;
            if (usa.equalsIgnoreCase("circulos"))
                seleccionado.setText("O");
            else
                seleccionado.setText("X");
            tengoTurno = false;
            seleccionado.setEnabled(false);// Deshabilito el boton para que no se elija mas de una vez.
            cj.asignarValor(1,1,usa);
            if(cj.gano())
                lblGanador.setText("El ganador es " + nombre);
            else {
                cj.proximoMovimiento(usa);
                if(cj.gano())
                    lblGanador.setText("El ganador es la máquina");
                tengoTurno = true;
            }
        }
    }
}
