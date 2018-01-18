import gulp from 'gulp';
import babel from 'gulp-babel';
import pug from 'gulp-pug';
import browserSync from 'browser-sync'; // permite crear un servidor local
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cssnano from 'cssnano';

// en el origen (dev) si es necesario crear las carpetas
// y en public, no, ya que si no existe, la misma tarea las crea

const server = browserSync.create(); // se crea el servidor y se asigna a la variable server

const postCSSPlugins = [ // plugins de postcss
  cssnano({
    autoprefixer: {
      add: true
    }
  })
];

gulp.task('es6', () =>
  gulp.src('./dev/js/*.js') // carpeta para los archivos de desarrollo
    .pipe(babel())
    .pipe(gulp.dest('./public/js')) // esta es la que se sube a un servidor real
);

gulp.task('sass', () =>
  gulp.src('./dev/scss/styles.scss')
    .pipe(sass())
    .pipe(postcss(postCSSPlugins))
    .pipe(gulp.dest('./public/css'))
    .pipe(server.stream({match: '**/*.css'})) // atraves de stream le envía css al navegador
    // en tiempo real sin necesidad de refrescar la página
);

gulp.task('pug', () =>
  gulp.src('./dev/pug/*.pug') // recogerlos
    .pipe(pug()) // procesarlos
    .pipe(gulp.dest('./public')) // y dejarlos en la carpeta
);

gulp.task('default', () => {
  server.init({ // inicializa el servidor
    server: {
      baseDir: './public' // carpeta raiz del servidor
    }
  });
  gulp.watch('./dev/js/*.js', ['es6', server.reload]);
  gulp.watch('./dev/pug/**/*.pug', ['pug', server.reload]);
  gulp.watch('./dev/scss/**/*.scss', ['sass']);
  // no es necesario recargar los estilos, ya que se inyectan en vivo
});
/**
 * el watch, recive 2 parámetros
 * el primer parámetro es la carpeta que va a vigilar
 * en este caso se le dice que vigile la carpeta ./dev/js/
 * y dentro de ella cualquier archivo *.js
 * 
 * y el segundo parámetro, es un array de tareas que va a realizar
 * ejecuta la tarea 'es6' (que conviente el código de ES6 a ES5)
 * y que luego recargue el navegador, en cualquier cambio de Javascript
 * si algún archivo .js sufre alguna modificación
 */