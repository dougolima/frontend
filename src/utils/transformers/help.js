export const routeToId = path => {
  switch (path) {
    case '/':
      return 'triagem';
    case '/triagem/:slug':
      return 'prescricao';
    case '/medicamentos/:idSegment/:idDrug/:slug':
      return 'medicamentos';
    case '/relatorios/visualizar':
      return 'relatorios';

    default:
      return path.replace('/', '');
  }
};
