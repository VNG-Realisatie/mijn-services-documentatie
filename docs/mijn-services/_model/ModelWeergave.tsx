import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Mermaid from '@theme/Mermaid';
import model, {getBouwsteen, getWeergave, maakDiagram} from './model';

export default function ModelWeergave({weergave}: {weergave: string}) {
  const baseUrl = useBaseUrl('/');
  const selectie = getWeergave(weergave);
  const diagram = maakDiagram(weergave, (pad) => `${baseUrl}${pad.replace(/^\//, '')}`);

  return (
    <>
      <Mermaid value={diagram} />
      <table>
        <thead>
          <tr>
            <th>Begrip</th>
            <th>Definitie</th>
          </tr>
        </thead>
        <tbody>
          {selectie.tabel.map((id) => {
            const begrip = model.begrippen.definities[id];
            const bouwsteen = getBouwsteen(id);
            return (
              <tr key={id}>
                <td>
                  <strong>
                    {bouwsteen ? <Link to={bouwsteen.pagina}>{begrip.naam}</Link> : begrip.naam}
                  </strong>
                </td>
                <td>{begrip.definitie}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}