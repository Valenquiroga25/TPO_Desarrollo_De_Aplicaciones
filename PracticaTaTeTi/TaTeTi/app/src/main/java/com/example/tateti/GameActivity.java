package com.example.tateti;

import android.os.*;
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

        lblJugador = (TextView) findViewById(R.id.lblJugador);
        lblJugador.setText(nombre + "juega con " + usa);
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

    }
}
