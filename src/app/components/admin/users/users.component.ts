import { Component, OnInit } from '@angular/core';
import { User } from '../../../interfaces/user';
import { ApiService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';
import { Order } from '../../../interfaces/order';
import { Orderitem } from '../../../interfaces/orderitem';
import { Pizza } from '../../../interfaces/pizza';
import { NumberFormatPipe } from '../../../pipes/number-format.pipe';

declare var bootstrap: any;

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule,CommonModule,NumberFormatPipe],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  users : User[] = []
  order_items : Orderitem[] =  []
  pizzas: Pizza[] = []
  user: User = {
    id : 0,
    name: '',
    email: '',
    password: '',
    role: ''
  }
  currentPage = 1;
    pageSize = 5;
    totalPages = 1;
    selectedUser : User = {
      id: 0,
      name: '',
      email: '',
      role: ''
    }
  pagedUsers: User[] = [];
  orders: Order[] = [] 
ngOnInit(): void {
  this.getUsers()
  this.getPizzas()
  this.detailsModal = new bootstrap.Modal('#detailsModal');
  this.confirmModal = new bootstrap.Modal('#confirmModal');
  this.infoModal = new bootstrap.Modal('#infoModal');


}
  detailsModal: any;
  confirmModal: any;
  infoModal:any;

  
  constructor(
      private api: ApiService,
      private message: MessageService,
      private auth : AuthService
    ) { }
    startIndex = 1;
    endIndex = 1;
    getUsers(){
      this.api.selectAll("users").then(res=>{
        this.users = res.data
        this.totalPages = Math.ceil(this.users.length / this.pageSize);
        this.setPage(1)
      })
    }
    getPizzas(){
      this.api.selectAll("pizzas").then(res=>{
        this.pizzas = res.data
      })
    }
    getUser(id: number) {
      this.api.select('users', id).then(res => {
        this.selectedUser = res.data[0];
        
        this.api.select("orders/user_id/eq", id).then(res=>{
            this.orders = res.data
            this.detailsModal.show();
        })
      });
    }
    confirmDelete(id: number) {
      this.user.id = id;
      this.confirmModal.show();
    }
    setPage(page: number){
      this.currentPage = page;
      this.startIndex = (page-1) * this.pageSize;
      this.endIndex = this.startIndex + this.pageSize;
      this.pagedUsers =  this.users.slice(this.startIndex, this.endIndex);
    }
    cancel(){
      this.selectedUser = {
        id : this.user.id,
        name: '',
        email: '',
        password: '',
        role: ''
      }
      this.orders = []
      this.getUsers(); // ezt csak akkor ha volt változás pl kép törlés
      this.detailsModal.hide();
    }
    async suspend(id: number) {
      let user = this.users.find(item => item.id == id);
      
      let loggeduser = await this.auth.loggedUser()[0]
      this.user = {
        id : user!.id,
        name: user!.name,
        email: user!.email,
        phone: user!.phone,
        address: user!.address,
        role: user!.role,
        status: user!.status
      }
      
      if(this.user.status){
        this.user.status = false
        console.log(this.user.status)
      }
      else{
        this.user.status = true
        console.log(this.user.status)
      }
      console.log(this.user)

      if(this.user.id != loggeduser.id){
        await this.api.update('users', id, {status : this.user.status ? 1 : 0}).then(res => {
          this.message.show('success', 'Ok', 'A felhasználó felfüggesztve!');
          this.confirmModal.hide();
          this.user = {
            id:this.user.id,
            name: '',
            email: '',
            password: '',
            phone: '',
            address: "",
            role: '',
            status: true
          };
          this.getUsers();
        });
      }
      else{
        this.message.show("warning","Vigyázz!","Saját magad nem függesztheted fel!")
      }
      
    }
    OrderInfo(id:number){
      this.api.select("order_items/order_id/eq",id).then(res=>{
        this.order_items = res.data
        this.infoModal.show()
      })
    }
}
