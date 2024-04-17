package com.example.tateti;

import java.util.Objects;
import java.util.Random;

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
        return VerificarHorizontal() || VerificarVertical() || VerificarDiagonal();
    }

    private boolean VerificarHorizontal(){
        for(int i=0;i<3;i++){
            if(!Objects.equals(tablero[i][0], "-") && !Objects.equals(tablero[i][1], "-") && !Objects.equals(tablero[i][2], "-"))
                if(Objects.equals(tablero[i][0], tablero[i][1]) && Objects.equals(tablero[i][0], tablero[i][2]))
                    return true;
        }
        return false;
    }

    private boolean VerificarVertical(){
        for(int i=0;i<3;i++){
            if(!Objects.equals(tablero[0][i], "-") && !Objects.equals(tablero[1][i], "-") && !Objects.equals(tablero[2][i], "-"))
                if((Objects.equals(tablero[0][i], tablero[1][i])) && (Objects.equals(tablero[1][i], tablero[2][i])))
                    return true;
        }
        return false;
    }

    private boolean VerificarDiagonal(){
        if((!Objects.equals(tablero[0][0], "-") && !Objects.equals(tablero[1][1], "-") && !Objects.equals(tablero[2][2], "-") ||
                (!Objects.equals(tablero[2][0], "-") && !Objects.equals(tablero[1][1], "-") && !Objects.equals(tablero[0][2], "-"))))
            if((Objects.equals(tablero[0][0], tablero[1][1]) && Objects.equals(tablero[1][1], tablero[2][2])) ||
                    (Objects.equals(tablero[2][0], tablero[1][1]) && Objects.equals(tablero[1][1], tablero[0][2])))
                return true;
        return false;
    }


    public int[] proximoMovimiento(String usa) {
        Random ran = new Random();
        int random1 = ran.nextInt(tablero.length);
        int random2 = ran.nextInt(tablero.length);

        while(!Objects.equals(tablero[random1][random2], "-")){
            random1 = ran.nextInt(tablero.length);
            random2 = ran.nextInt(tablero.length);
        }

        int[] numeros = new int[2];
        numeros[0] = random1;
        numeros[1] = random2;

        if (Objects.equals(usa, "cruces"))
            tablero[random1][random2] = "O";
        else
            tablero[random1][random2] = "X";

        return numeros;
    }

    public void reiniciar(){
        for(int i=0; i < 3; i++){
            for(int j=0; j < 3; j++){
                tablero[i][j] = "-";
            }
        }
    }

    public boolean terminoEmpate(){
        for(int i = 0; i < tablero.length;i++){
            for(int j=0;j<tablero[0].length;j++){
                if(Objects.equals(tablero[i][j], "-"))
                    return false;
            }
        }
        return true;
    }
}
