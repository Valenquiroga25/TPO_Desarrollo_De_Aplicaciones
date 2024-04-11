package com.example.tateti;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import androidx.appcompat.app.AppCompatActivity;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import com.example.tateti.databinding.ActivityMainBinding;

import android.view.Menu;
import android.view.MenuItem;

public class MainActivity extends AppCompatActivity {

    private AppBarConfiguration appBarConfiguration;
    private ActivityMainBinding binding;

    EditText nombre;
    Button boton;
    RadioButton circulos,cruces;

    @SuppressLint("ResourceType")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        nombre = findViewById(R.id.txtNombre); // findViewById es para decir que la variable creada arriba hace referencia a un objeto del layout.
        boton = findViewById(R.id.btnComenzar); // 'boton' hace referencia a 'btnComenzar' del layout.
        circulos = findViewById(R.id.rbCirculos);
        cruces = findViewById(R.id.rbCruces);

        boton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent aux = new Intent(MainActivity.this, GameActivity.class); // El intent permite llamar a una instancia de GameActivity y sederle el control del programa.
                                                                                             // Se le puede pasar parametros como hacemos abajo.
                String elNombre = nombre.getText().toString();
                if(elNombre.isEmpty())
                    elNombre = "Extraño";
                aux.putExtra("nombre", elNombre); // El atributo nombre del gameActivity toma el valor de elNombre.

                if(circulos.isChecked())
                    aux.putExtra("usa","circulos");
                else
                    aux.putExtra("usa","cruces");
                startActivity(aux);
            }
        });
    }
}