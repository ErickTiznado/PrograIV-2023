
Vue.component('component-materias',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            materias: [],
            docentes : [],
            materia:{
                idMateria : '',
                codigo : '',
                materia : '',
                docente  :'',
                a : '',
                de : '',
                dia : '',
                Aula : '',
 
            }
        }
    },
    methods:{
        guardarMateria(){
            this.listar();
            if(this.accion==='nuevo'){
                this.materia.idMateria = new Date().getTime().toString(16);
                this.materias.push( JSON.parse( JSON.stringify(this.materia) ) );
            }else if(this.accion==='modificar'){
                let index = this.materias.findIndex(materia=>materia.idMateria==this.materia.idMateria);
                this.materias[index] = JSON.parse( JSON.stringify(this.materia) );
            }else if(this.accion==='eliminar'){
                let index = this.materias.findIndex(materia=>materia.idMateria==this.materia.idMateria);
                this.materias.splice(index,1);
            }
            localStorage.setItem("materias", JSON.stringify(this.materias) );
            fetch(`private/modulos/materias/materias.php?accion=${this.accion}&materias=${JSON.stringify(this.materia)}`)
            .then(resp=>resp.json())
            .then(resp=>{
                console.log(resp);
            });
            this.nuevoMateria();
        },
        eliminarMateria(materia){
            if( confirm(`Esta seguro de eliminar a ${materia.nombre}?`) ){
                this.accion='eliminar';
                this.materia=materia;
                this.guardarMateria();
            }
        },
        nuevoMateria(){
            this.accion = 'nuevo';
            this.materia.idMateria = '';
            this.materia.codigo = '';
            this.materia.materia = '';
            this.materia.docente ='';
            this.materia.a='';
            this.materia.de='';
            this.materia.dia='';
            this.materia.Aula=''
        },
        modificarMateria(materia){
            this.accion = 'modificar';
            this.materia = materia;
        },
        listar(){
            this.materias = JSON.parse( localStorage.getItem('materias') || "[]" )
                .filter(materia=>materia.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1);
                this.docentes = JSON.parse( localStorage.getItem('docentes') || "[]" );
                if( this.materias.length<=0 && this.buscar.trim().length<=0 ){
                    fetch('private/modulos/materias/materias.php?accion=consultar')
                    .then(resp=>resp.json())
                    .then(resp=>{
                        this.materias = resp;
                        localStorage.setItem("materias", JSON.stringify(this.materias) );
                    });
            }
                }
    },
    template: `
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">REGISTRO DE MATERIA</div>
                    <div class="card-body">
                        <form id="frmMateria" @reset.prevent="nuevoMateria" v-on:submit.prevent="guardarMateria">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoMateria">Codigo:</label>
                                </div>
                                <div class="col-6 col-md-6">
                                    <input required pattern="[0-9]{3}" 
                                        title="Ingrese un codigo de materia de 3 digitos"
                                            v-model="materia.codigo" type="text" class="form-control" name="txtCodigoMateria" id="txtCodigoMateria">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtMateriaMateria">Materia:</label>
                                </div>
                                <div class="col-6 col-md-6">
                                    <input required pattern="[A-Za-zÑñáéíóú ]{3,75}"
                                        v-model="materia.materia" type="text" class="form-control" name="txtMateriaMateria" id="txtMateriaMateria">
                                </div>
                            </div>
                            <div class="row p-1">
                            <div class="col-3 col-md-2">
                                <label for="txtDocenteMateria">Docente:</label>
                            </div>
                            <div class="col-6 col-md-6">
                            <select required id="txtDocenteMateria" class="form-control" v-model="materia.docente">
                            <option v-for="docente in docentes" :value="docente.nombre">{{ docente.codigo }} - {{ docente.nombre}}</option>
                            </select>
                            </div>
                        </div>
                         <div class="row p-1">
                            <div class="col-3 col-md-2">De:</div>
                            <div class="col-6 col-md-6">
                                <input title="Ingrese la hora de inicio" v-model="materia.de" required type="time"
                                    class="form-control">
                            </div>
                        </div>
                            <div class="row p-1">
                            <div class="col-3 col-md-2">A:</div>
                            <div class="col-6 col-md-6">
                                <input title="Ingrese la hora de finalizacion" v-model="materia.a" required type="time"
                                    class="form-control">
                            </div>
                        </div>
                        <div class="row p-1">
                        <div class="col-3 col-md-2">
                          <label for="dia">Dia:</label>
                        </div>
                        <div class="col-6 col-md-6">
                          <select required v-model="materia.dia" name="txtCicloDia" id="txtCicloDia">
                            <option value="" disabled>Selecciona el dia </option>
                            <option value="Lunes">Lunes</option>
                            <option value="Martes">Martes</option>
                            <option value="Miercoles">Miercoles</option>
                            <option value="Jueves">Jueves</option>
                            <option value=" Viernes">Viernes</option>
                            <option value="Sabado">Sabado</option>
                            <option value="Domingo">Domingo</option>
                           
                          </select>
                        </div>
                      </div>
                        <div class="row p-1">
                            <div class="col-3 col-md-2">Aula:</div>
                            <div class="col-6 col-md-6">
                                <input  title="Ingrese el Aula" v-model="materia.Aula"
                                    pattern="[A-Za-zñÑáéíóúü .#0-9_]{3,75}" required type="text" class="form-control">
                            </div>
                        </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-primary" type="submit" 
                                        value="Guardar">
                                </div>
                                <div class="col-3 col-md-3">
                                    <input class="btn btn-warning" type="reset" value="Nuevo">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-12">
                <div class="card">
                    <div class="card-header">LISTADO DE MATERIAS</div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR:</th>
                                    <th colspan="2"><input type="text" class="form-control" v-model="buscar"
                                        @keyup="listar()"
                                        placeholder="Buscar por codigo o nombre"></th>
                                </tr>
                                <tr>
                                <th>codigo:</th>
                                <th>materias:</th>
                                <th>docente:</th>
                                <th>a:</th>
                                <th>de:</th>
                                <th>dia:</th>
                                <th>Aula:</th>
                
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="materia in materias" :key="materia.idMateria" @click="modificarMateria(materia)" >
                                    <td>{{ materia.codigo  }}</td>
                                    <td>{{ materia.materia }}</td>
                                    <td>{{ materia.docente }}</td>
                                    <td>{{ materia.a }}</td>
                                    <td>{{ materia.de   }}</td>
                                    <td>{{ materia.dia   }}</td>
                                    <td>{{ materia.Aula   }}</td>
                                    
                                    <td><button class="btn btn-danger" @click="eliminarMateria(materia)">ELIMINAR</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `
});