import List from '../../components/list'
import Template from '../../components/template'

export default () => {
   return (
      <Template title="List Demo">
         <List type="ol" initItems={['starting', 'values']} /> 
      </Template>
   );
}