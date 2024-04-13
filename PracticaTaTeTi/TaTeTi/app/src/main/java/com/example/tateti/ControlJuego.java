package com.example.tateti;

import java.util.Objects;

public class ControlJuego {
    String[][] tablero = new String[3][3];

    public void inicializarTablero(){
        for(int i=0; i < tablero.length; i++){
            for(int j=0; j < tablero[0].length; j++){
                tablero[i][j] = "-";
            }
        }
    }

    public void asignarValor(int i, int j, String usa){
        if (Objects.equals(usa, "circulos"))
            tablero[i][j] = "O";
        else
            tablero[i][j] = "X";
    }

    public boolean gano(){
        for(int i=0; i < tablero.length; i++){
            for(int j=0; j < tablero[0].length; j++) {
                if (!Objects.equals(tablero[i][j], "-")) {
                    if (Objects.equals(tablero[i], 0)) {
                        if (Objects.equals(tablero[i][0], tablero[i][1]) && Objects.equals(tablero[i][0], tablero[i][2]) ||
                                ((Objects.equals(tablero[i][0], tablero[1][1]) && Objects.equals(tablero[i][0], tablero[2][2])) ||
                                        (Objects.equals(tablero[i][0], tablero[1][0]) && Objects.equals(tablero[i][0], tablero[2][0]))))
                            return true;
                    }

                    if (Objects.equals(tablero[j], 1)) {
                        if (Objects.equals(tablero[0][j], tablero[1][j]) && Objects.equals(tablero[0][j], tablero[2][j]))
                            return true;

                    }

                    if (Objects.equals(tablero[j], 2)) {
                        if (Objects.equals(tablero[0][j], tablero[1][j]) && Objects.equals(tablero[0][j], tablero[2][j]) ||
                                (Objects.equals(tablero[0][j], tablero[1][1]) && Objects.equals(tablero[0][j], tablero[0][2])))
                            return true;

                    }

                    if (Objects.equals(tablero[i], 1)) {
                        if (Objects.equals(tablero[i][0], tablero[i][1]) && Objects.equals(tablero[i][0], tablero[i][2]))
                            return true;
                    }
                    if (Objects.equals(tablero[i], 2)) {
                        if (Objects.equals(tablero[i][0], tablero[i][1]) && Objects.equals(tablero[i][0], tablero[i][2]))
                            return true;
                    }
                }
            }
        }
        return false;
    }

    public void proximoMovimiento(String usa) {
        int random1 = (int)(Math.random()*3+1);
        int random2 = (int)(Math.random()*3+1);

        while(!Objects.equals(tablero[random1][random2], "-")){
            random1 = (int)(Math.random()*3+1);
            random2 = (int)(Math.random()*3+1);
        }

        if (Objects.equals(usa, "X"))
            tablero[random1][random2] = "O";
        else
            tablero[random1][random2] = "X";
    }
}
