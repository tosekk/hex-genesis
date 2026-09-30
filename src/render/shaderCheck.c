/* Optional macOS headless shader compiler used by shaderCheck.test.ts. No browser/dependency. */
#include <OpenGL/OpenGL.h>
#include <OpenGL/gl3.h>
#include <stdio.h>
#include <stdlib.h>

static char *read_source(const char *path) {
  FILE *file = fopen(path, "rb"); if (!file) return NULL;
  fseek(file, 0, SEEK_END); long size = ftell(file); rewind(file);
  char *source = calloc(size + 1, 1); fread(source, 1, size, file); fclose(file); return source;
}
static GLuint compile(GLenum type, const char *path) {
  char *source = read_source(path); if (!source) return 0;
  GLuint shader = glCreateShader(type); glShaderSource(shader, 1, (const GLchar **)&source, NULL); glCompileShader(shader); free(source);
  GLint ok; glGetShaderiv(shader, GL_COMPILE_STATUS, &ok);
  if (!ok) { char message[8192]; glGetShaderInfoLog(shader, sizeof(message), NULL, message); fprintf(stderr, "%s: %s\n", path, message); glDeleteShader(shader); return 0; }
  return shader;
}
int main(int argc, char **argv) {
  if (argc != 3) return 2;
  CGLPixelFormatAttribute attrs[] = { kCGLPFAOpenGLProfile, (CGLPixelFormatAttribute)kCGLOGLPVersion_3_2_Core, (CGLPixelFormatAttribute)0 };
  CGLPixelFormatObj format; GLint count; CGLContextObj context;
  if (CGLChoosePixelFormat(attrs, &format, &count) != kCGLNoError || !format) return 77;
  if (CGLCreateContext(format, NULL, &context) != kCGLNoError) { CGLDestroyPixelFormat(format); return 77; }
  CGLDestroyPixelFormat(format); CGLSetCurrentContext(context);
  GLuint vs = compile(GL_VERTEX_SHADER, argv[1]), fs = compile(GL_FRAGMENT_SHADER, argv[2]);
  int result = 1;
  if (vs && fs) {
    GLuint program = glCreateProgram(); glAttachShader(program, vs); glAttachShader(program, fs); glLinkProgram(program);
    GLint ok; glGetProgramiv(program, GL_LINK_STATUS, &ok);
    if (!ok) { char message[8192]; glGetProgramInfoLog(program, sizeof(message), NULL, message); fprintf(stderr, "link: %s\n", message); }
    result = ok ? 0 : 1; glDeleteProgram(program);
  }
  if (vs) glDeleteShader(vs); if (fs) glDeleteShader(fs); CGLSetCurrentContext(NULL); CGLDestroyContext(context); return result;
}
