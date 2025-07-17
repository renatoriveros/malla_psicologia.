// Definición completa de los ramos con prerequisitos y qué desbloquean

const ramos = [
  // Año 1, Semestre 1
  { id: 'introduccion_psicologia', nombre: 'Introducción a la Psicología', semestre: 1, desbloquea: ['procesos_psicologicos', 'taller_integracion_1', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'fundamentos_socioculturales', nombre: 'Fundamentos Socioculturales de la Psicología', semestre: 1, desbloquea: ['teoria_psicologia_social', 'taller_integracion_1', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'fundamentos_biologicos', nombre: 'Fundamentos Biológicos del Comportamiento Humano', semestre: 1, desbloquea: ['neurociencia_cognitiva', 'taller_integracion_1', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'filosofia_psicologia', nombre: 'Filosofía y Psicología', semestre: 1, desbloquea: ['taller_integracion_1', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'ingles_1', nombre: 'Inglés 1', semestre: 1, desbloquea: ['ingles_2', 'taller_integracion_1', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'habilidades_formacion_inicial', nombre: 'Habilidades de Formación Inicial', semestre: 1, desbloquea: ['taller_integracion_1', 'taller_esp_1', 'taller_esp_2'] },

  // Año 1, Semestre 2
  { id: 'modelos_sistemicos', nombre: 'Modelos Sistémicos', semestre: 2, desbloquea: ['taller_integracion_1', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'procesos_psicologicos', nombre: 'Procesos Psicológicos', semestre: 2, desbloquea: ['personalidad', 'psicologia_desarrollo', 'taller_integracion_1', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'teoria_psicologia_social', nombre: 'Teoría Psicología Social', semestre: 2, desbloquea: ['psicologia_social_aplicada', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'neurociencia_cognitiva', nombre: 'Neurociencia Cognitiva y del Desarrollo', semestre: 2, desbloquea: ['neurociencias_afectiva_social', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'metodologia_investigacion', nombre: 'Metodología de la Investigación', semestre: 2, desbloquea: ['metodos_cuantitativos', 'taller_integracion_1', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'ingles_2', nombre: 'Inglés 2', semestre: 2, desbloquea: ['ingles_3', 'taller_integracion_1', 'taller_esp_1', 'taller_esp_2'] },

  // Año 2, Semestre 3
  { id: 'modelos_cognitivos_conductual', nombre: 'Modelos Cognitivos Conductual', semestre: 3, desbloquea: ['taller_integracion_1', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'personalidad', nombre: 'Personalidad', semestre: 3, desbloquea: ['psicopatologia', 'tecnicas_evaluacion_psicologica', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'psicologia_desarrollo', nombre: 'Psicología del Desarrollo', semestre: 3, desbloquea: ['psicologia_desarrollo_2', 'taller_integracion_1', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'psicologia_social_aplicada', nombre: 'Psicología Social Aplicada', semestre: 3, desbloquea: ['psicologia_educacional', 'psicologia_trabajo', 'psicologia_juridica', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'neurociencias_afectiva_social', nombre: 'Neurociencias Afectiva y Social', semestre: 3, desbloquea: ['taller_integracion_1'] },
  { id: 'ingles_3', nombre: 'Inglés 3', semestre: 3, desbloquea: ['taller_integracion_1', 'taller_esp_1', 'taller_esp_2'] },

  // Año 2, Semestre 4
  { id: 'modelos_psicoanaliticos', nombre: 'Modelos Psicoanalíticos', semestre: 4, desbloquea: ['taller_esp_1', 'taller_esp_2'] },
  { id: 'modelo_humanista_experiencial', nombre: 'Modelo Humanista Experiencial', semestre: 4, desbloquea: ['taller_esp_1', 'taller_esp_2'] },
  { id: 'psicologia_desarrollo_2', nombre: 'Psicología del Desarrollo 2', semestre: 4, desbloquea: ['clinica_infanto_juvenil', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'psicopatologia', nombre: 'Psicopatología', semestre: 4, desbloquea: ['psiquiatria', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'taller_integracion_1', nombre: 'Taller de Integración 1', semestre: 4, desbloquea: ['taller_esp_1', 'taller_esp_2'] },
  { id: 'electivo_formacion_integral_1', nombre: 'Electivo de Formación Integral 1', semestre: 4, desbloquea: ['electivo_formacion_integral_1', 'taller_esp_1', 'taller_esp_2'] },

  // Año 3, Semestre 5
  { id: 'tecnicas_evaluacion_psicologica', nombre: 'Técnicas de Evaluación Psicológica', semestre: 5, desbloquea: ['diagnostico_clinico_adulto_1', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'psiquiatria', nombre: 'Psiquiatría', semestre: 5, desbloquea: ['taller_esp_1', 'taller_esp_2'] },
  { id: 'psicologia_trabajo', nombre: 'Psicología del Trabajo y las Organizaciones', semestre: 5, desbloquea: ['intervenciones_contextos_organizacionales', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'psicologia_educacional', nombre: 'Psicología Educacional', semestre: 5, desbloquea: ['taller_esp_1', 'taller_esp_2'] },
  { id: 'metodos_cuantitativos', nombre: 'Métodos Cuantitativos en Psicología', semestre: 5, desbloquea: ['metodos_cualitativos', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'electivo_formacion_integral_2', nombre: 'Electivo de Formación Integral 2', semestre: 5, desbloquea: ['taller_esp_1', 'taller_esp_2'] },

  // Año 3, Semestre 6
  { id: 'diagnostico_clinico_adulto_1', nombre: 'Diagnóstico Clínico Adulto 1', semestre: 6, desbloquea: ['diagnostico_clinico_adulto_2', 'introduccion_psicologia_clinica', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'clinica_infanto_juvenil', nombre: 'Clínica Infanto Juvenil', semestre: 6, desbloquea: ['psicodiagnostico_infanto_juvenil', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'intervenciones_contextos_organizacionales', nombre: 'Intervenciones en Contextos Organizacionales', semestre: 6, desbloquea: ['taller_integracion_2', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'intervencion_psicologia_educativa', nombre: 'Intervención en Psicología Educativa', semestre: 6, desbloquea: ['taller_integracion_2', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'metodos_cualitativos', nombre: 'Métodos Cualitativos en Psicología', semestre: 6, desbloquea: ['seminario_investigacion_1', 'taller_esp_1', 'taller_esp_2'] },

  // Año 4, Semestre 7
  { id: 'diagnostico_clinico_adulto_2', nombre: 'Diagnóstico Clínico Adulto 2', semestre: 7, desbloquea: ['taller_integracion_2', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'psicodiagnostico_infanto_juvenil', nombre: 'Psicodiagnóstico Infanto Juvenil', semestre: 7, desbloquea: ['psicoterapia_infanto_juvenil', 'taller_integracion_2', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'introduccion_psicologia_clinica', nombre: 'Introducción a la Psicología Clínica', semestre: 7, desbloquea: ['intervenciones_psicologia_clinica', 'taller_integracion_2', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'psicologia_juridica', nombre: 'Psicología Jurídica', semestre: 7, desbloquea: ['taller_esp_1', 'taller_esp_2'] },
  { id: 'psicologia_comunitaria', nombre: 'Psicología Comunitaria', semestre: 7, desbloquea: ['taller_esp_1', 'taller_esp_2'] },
  { id: 'electivo_especialidad_1', nombre: 'Electivo de Especialidad 1', semestre: 7, desbloquea: ['taller_esp_1', 'taller_esp_2'] },

  // Año 4, Semestre 8
  { id: 'psicoterapia_infanto_juvenil', nombre: 'Psicoterapia Infanto Juvenil', semestre: 8, desbloquea: ['taller_esp_1', 'taller_esp_2'] },
  { id: 'intervenciones_psicologia_clinica', nombre: 'Intervenciones en Psicología Clínica', semestre: 8, desbloquea: ['taller_integracion_2', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'seminario_investigacion_1', nombre: 'Seminario de Investigación 1', semestre: 8, desbloquea: ['seminario_investigacion_2', 'examen_grado', 'taller_esp_1', 'taller_esp_2'] },
  { id: 'electivo_especialidad_2', nombre: 'Electivo de Especialidad 2', semestre: 8, desbloquea: ['taller_esp_1', 'taller_esp_2'] },
  { id: 'taller_integracion_2', nombre: 'Taller de Integración 2', semestre: 8, desbloquea: ['taller_esp_1', 'taller_esp_2'] },

  // Año 5, Semestre 9
  { id: 'seminario_investigacion_2', nombre: 'Seminario de Investigación 2', semestre: 9, desbloquea: [] },
  { id: 'taller_esp_1', nombre: 'Taller de Especialización 1', semestre: 9, desbloquea: ['practica_profesional'], condicionEspecial: true },
  { id: 'taller_esp_2', nombre: 'Taller de Especialización 2', semestre: 9, desbloquea: ['practica_profesional'], condicionEspecial: true },
  { id: 'examen_grado', nombre: 'Examen de Grado', semestre: 9, desbloquea: ['practica_profesional'] },

  // Año 5, Semestre 10
  { id: 'practica_profesional', nombre: 'Práctica Profesional', semestre: 10, desbloquea: [] },
  { id: 'examen_titulo', nombre: 'Examen de Título', semestre: 10, desbloquea: [] }
];

// Set para almacenar aprobados
const completados = new Set();

// Función para crear y mostrar la malla
function crearMalla() {
  const contenedor = document.getElementById('malla');
  contenedor.innerHTML = '';

  const semestres = [...new Set(ramos.map(r => r.semestre))];

  semestres.forEach(sem => {
    const divSem = document.createElement('div');
    divSem.className = 'semestre';
    divSem.innerHTML = `<h2>Semestre ${sem}</h2><div class="ramos-container" id="sem${sem}"></div>`;
    contenedor.appendChild(divSem);
  });

  ramos.forEach(ramo => {
    const btn = document.createElement('button');
    btn.id = ramo.id;
    btn.className = 'ramo bloqueado';
    btn.innerText = ramo.nombre;
    btn.disabled = true;
    btn.onclick = () => aprobarRamo(ramo.id);
    document.getElementById(`sem${ramo.semestre}`).appendChild(btn);
  });

  // Desbloquear primeros semestres
  ramos.filter(r => r.semestre === 1).forEach(r => desbloquearRamo(r.id));
}

// Función para aprobar un ramo
function aprobarRamo(id) {
  const ramo = ramos.find(r => r.id === id);
  if (!ramo) return;

  // Si ya está completado o bloqueado
  if (completados.has(id)) return;

  const btn = document.getElementById(id);
  if (!btn || btn.disabled) return;

  // Marcar como completado
 

