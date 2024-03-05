using { sap.capire.bookshop as bookshop } from '../db/schema';

// annotate bookshop.Books with @PersonalData: {
//     EntitySemantics : 'DataSubject'
// }
// {
//   ID @PersonalData.FieldSemantics: 'DataSubjectID';
//   title @PersonalData.IsPotentiallyPersonal;
// };

annotate bookshop.Authors with @PersonalData: {
  DataSubjectRole : 'Author',
  EntitySemantics : 'DataSubject'
}{
  ID @PersonalData.FieldSemantics: 'DataSubjectID';
  name @PersonalData.IsPotentiallyPersonal;
  dateOfBirth @PersonalData.IsPotentiallySensitive;  
}