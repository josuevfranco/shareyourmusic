#include <iostream>
#include <cstdlib>//<------ malloc, free
#include <iomanip>

using namespace std;

void llenarvec(int *, int );
void imprimirvec (int *, int);
void llenarmat(int **, int, int );
void imprimirmat(int **, int, int );

/* La biblioteca estándar de C proporciona Las funciones malloc, calloc, realloc y free
para el manejo de memoria dinámica. Estos funciones están definidas en el archivo 
de cabecera stdlib.h */


int main(int argc, char** argv) {
	
	/*La función malloc reserva un bloque de memoria y devuelve un punterovoid 
	al inicio de la misma. Tiene La siguiente definición: 
	void malloc(size_t size),

    donde el parámetro size especifica el número de bytes a reservar. En caso de que 
	no se pueda realizar la asignación, devuelve el valor nulo (definido en la macro NULL),
	Lo que permite saber si hubo errores en la asignación de memoria. */
	
	cout<<endl;
	cout<<endl<<"Jesus Alan Alvarado Diaz               ID: 295344"<<endl;
	
	int *ptr1;
	ptr1=(int *) malloc(sizeof(int)); //equivale a ptr1 = new int;
	*ptr1=9;
	cout<<endl<< *ptr1;
	cout<<endl;
	
	char *ptr2;
	ptr2=(char*)malloc (sizeof(char));// equivale a ptr2 = new char;
	*ptr2= 's';
	cout<<endl<<*ptr2;
	cout<< endl;
	
	free (ptr1); //equivale a delete ptr1
	free (ptr2); //equivale a delete ptr2
	
	//vectores dinamicos
	int *v;
	int n;
	cout<<endl<<"De cuantas casillas quieres el vector ";
	cin>>n;
	
	//creando espacio para el vector dinamico
	v = (int *)malloc(n* sizeof(int)); 
	
	imprimirvec (v,n);
	llenarvec (v,n);
	
	//eliminando el espacio de la memoria dinamica
	free (v);
	cout<<endl;
	
	//matrices dinamicos
	int **mat;
	int ren, col;
	
	cout<<endl<<"De cuantos renglones: ";
	cin>>ren;
	cout<<endl<<"De cuantas columnas: ";
	cin>>col;
	
	//Creando espacio para La matriz dinamica. 
	mat= (int **) malloc(ren * sizeof(int *));
	for(int i=0; i<ren; i++){ 
		mat [i] = (int *)malloc(col* sizeof(int));
	}///fin for i
	
llenarmat (mat, ren, col); 
imprimirmat (mat, ren, col);

//eliminando el espacio de la memoria dinamica
for (int i=0; i<ren; i++) 
	free (mat[i]);
free (mat);

return 0;
}//fin main 

void llenarvec (int *v, int n) {
cout<<endl<<"llenando el vector ..."; 
	for (int i=0; i<n; i++){ 
	v[i]=(i+1) * 5;
 	}//fin for i
cout<<"Listo";
}//fin funcion void llenarvec (int *v, int n)

void imprimirvec (int *v, int n) { 
	cout<<endl<<"Imprimiendo el vector ...";
	for (int i=0; i<n; i++){ 
		cout<<v[i]<<" ";
	}//fin for i
}//fin funcion void imprimirvec (int *v, int n)

void llenarmat(int **mat, int r, int c) { 
	for (int i=0; i<r; i++){ 
		for (int j=0; j<c; j++){
			mat[i][j]=i+1*10;
		}//fin for j
	}//fin for i
}//fin funcion void llenarmat(int **mat, int r, int c)

void imprimirmat(int **mat, int r, int c) {
	cout<<endl<<"imprimiendo matriz"<<endl; 
		for (int i = 0 ; i<r; i++){ 
			for (int j = 0; j<c; j++){
				cout <<setw(3)<<mat[i][j];
			}//fin for j
			cout <<endl;
		}//fin for i 
}//fin funcion void imprimirmat(int **mat, int r, int c)
