import { Pipe, PipeTransform } from '@angular/core';
import { IPost } from './IPost';

@Pipe({
    name : 'cityFilter'
})
export class CityFilterPipe implements PipeTransform{    

    transform(list : IPost[], filterBy: string) : IPost[]{
        console.log(`inside City filter pipe.... filter by:  ${ filterBy }`);        

        // if no filterBr return null
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;

        // if not null filter otherwise return original list
        // could be coded with indexOf:        
        //return filterBy ? list.filter( (prod: IPost) => prod.productName.toLocaleLowerCase().indexOf(filterBy) !== -1) : list;
        return filterBy ? list.filter( (post: IPost) => post.title.toLocaleLowerCase().includes(filterBy)) : list;
        
    }
}
