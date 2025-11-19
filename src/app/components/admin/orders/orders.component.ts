import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { MessageService } from '../../../services/message.service';
import { Order } from '../../../interfaces/order';
import { CommonModule } from '@angular/common';
import { Orderitem } from '../../../interfaces/orderitem';
import { User } from '../../../interfaces/user';
import { Pizza } from '../../../interfaces/pizza';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})

export class OrdersComponent implements OnInit {

  orders: Order[] = []
  order_items: Orderitem[] = []
  users: User[] = []
  pizzas: Pizza[] = []

  startIndex = 1;
  endIndex = 1;

  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  pagedOrders: Order[] = [];

  constructor(
    private api: ApiService,
    private message: MessageService,
  ) { }

  ngOnInit(): any {
    this.getUsers()
    this.getItems()
    this.getPizzas()
    this.getOrders()
    console.log(this.users)
  }
  getUsers() {
    this.api.selectAll("users").then(res => {
      this.users = res.data
    })
  }
  getOrders(){
    this.api.selectAll("orders").then(res => {
      this.orders = res.data
      this.totalPages = Math.ceil(this.orders.length / this.pageSize);
      this.setPage(1);
    })
  }
  getItems(){
    this.api.selectAll("order_items").then(res => {
      this.order_items = res.data
    })
  }
  getPizzas(){
    this.api.selectAll("pizzas").then(res => {
      this.pizzas = res.data

    })
  }
  setPage(page: number) {

    this.currentPage = page;
    this.startIndex = (page - 1) * this.pageSize;
    this.endIndex = this.startIndex + this.pageSize;
    this.pagedOrders = this.orders.slice(this.startIndex, this.endIndex);
  }
  
  ChangeOrderStatus(id:number){
    let order = this.orders.find(item => item.id == id);

    if (order?.status == "pending") {
      order.status = "completed"
    }
    else{
      order!.status = "pending"
    }

    this.api.update("orders",id,order).then(res =>
    {
      this.message.show("success","OK","Státusz sikeresen megváltoztatva!")
    }
    )
  }
}
