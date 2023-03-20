Vue.component('v-select-alumnos', VueSelect.VueSelect);
Vue.component('component-matriculas',{
    data() {
        return {
            accion:'nuevo',
            buscar: '',
            matriculas: [],
            alumnos : [],
            matricula:{
                idMatricula  : '',
                fecha     : '',
                pago      : false,
                comprobante : '',
                alumno    : '',
            }
        }
    },
    methods:{
        guardarMatricula(){
            this.listar();
            if(this.accion==='nuevo'){
                this.matricula.idMatricula = new Date().getTime().toString(16);
                this.matriculas.push( JSON.parse( JSON.stringify(this.matricula) ) );
            }else if(this.accion==='modificar'){
                let index = this.matriculas.findIndex(matricula=>matricula.idMatricula==this.matricula.idMatricula);
                this.matriculas[index] = JSON.parse( JSON.stringify(this.matricula) );
            }else if(this.accion==='eliminar'){
                let index = this.matriculas.findIndex(matricula=>matricula.idMatricula==this.matricula.idMatricula);
                this.matriculas.splice(index,1);
            }
            localStorage.setItem("matriculas", JSON.stringify(this.matriculas) );
            fetch(`private/modulos/matricula/matricula.php?accion=${this.accion}&matriculas=${JSON.stringify(this.matricula)}`)
            .then(resp=>resp.json())
            .then(resp=>{
                console.log(resp);
            });
            this.nuevoMatricula();
        },
        eliminarMatricula(matricula){
            if( confirm(`Esta seguro de eliminar a ${matricula.alumno.label}?`) ){
                this.accion='eliminar';
                this.matricula=matricula;
                this.guardarMatricula();
            }
        },
        nuevoMatricula(){
            this.accion = 'nuevo';
            this.matricula.idMatricula = '';
            this.matricula.fecha = '';
            this.matricula.pago = false;
            this.matricula.alumno = '';
        },
        modificarMatricula(matricula){
            this.accion = 'modificar';
            this.matricula = matricula;
        },
        listar(){
            this.matriculas = JSON.parse( localStorage.getItem('matriculas') || "[]" )
                .filter(matricula=>matricula.alumno.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 );
            this.alumnos = JSON.parse( localStorage.getItem('alumnos') || "[]");
            if( this.matriculas.length<=0 && this.buscar.trim().length<=0 ){
                fetch('private/modulos/matricula/matricula.php?accion=consultar')
                .then(resp=>resp.json())
                .then(resp=>{
                    this.docentes = resp;
                    localStorage.setItem("matriculas", JSON.stringify(this.matriculas) );
                });
            }
        }
    },
    template: `
        <div class="row">
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">REGISTRO DE MATRICULA</div>
                    <div class="card-body">
                        <form id="frmMatricula" @reset.prevent="nuevoMatricula" v-on:submit.prevent="guardarMatricula">
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtCodigoMatricula">ALUMNO:</label>
                                </div>
                                <div class="col-3 col-md-6">
                                <select required id="txtDocenteMateria" class="form-control" v-model="matricula.alumno">
                                <option v-for="alumno in alumnos" :value="alumno.nombre">{{ alumno.codigo }} - {{ alumno.nombre}}</option>
                                </select>
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label>FECHA:</label>
                                </div>
                                <div class="col-9 col-md-3">
                                    <input required v-model="matricula.fecha" type="date" class="form-control">
                                </div>
                            </div>
                            <div class="row p-1">
                                <div class="col-3 col-md-2">
                                    <label for="txtPagoMatricula">ACTUALIZAR PAGO:</label>
                                </div>
                                <div class="col-9 col-md-3">
                                    <input v-model="matricula.pago" type="checkbox" class="form-check-input" id="txtPagoMatricula">
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
            <div class="col-12 col-md-6">
                <div class="card">
                    <div class="card-header">LISTADO DE MATRICULAS</div>
                    <div class="card-body">
                        <table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>BUSCAR:</th>
                                    <th colspan="3"><input type="text" class="form-control" v-model="buscar"
                                        @keyup="listar()"
                                        placeholder="Buscar por codigo o nombre"></th>
                                </tr>
                                <tr>
                                    <th>FECHA</th>
                                    <th>PAGO</th>
                                    <th colspan="2">ALUMNO</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="matricula in matriculas" :key="matricula.idMatricula" @click="modificarMatricula(matricula)" >
                                    <td>{{ new Date(matricula.fecha +' 01:00:00').toLocaleDateString() }}</td>
                                    <td>{{ matricula.pago ? 'ACTUALIZADO' : 'PENDIENTE' }}</td>
                                    <td>{{ matricula.alumno.label }}</td>
                                    <td><button class="btn btn-danger" @click="eliminarMatricula(matricula)">ELIMINAR</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `
});
