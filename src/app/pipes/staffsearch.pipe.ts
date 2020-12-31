import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'staffsearch'
})
export class StaffsearchPipe implements PipeTransform {

  transform(value: any[], searchText:any): unknown {
    if(!searchText) return value;
    searchText= searchText.toLowerCase();
    let filteredStaff = value.filter(staff=>staff.staff_id.toLowerCase().includes(searchText) || staff.first_name.toLowerCase().includes(searchText) || staff.last_name.toLowerCase().includes(searchText) || staff.type.toLowerCase().includes(searchText))
    console.log(filteredStaff)

    return filteredStaff;
  }

}
