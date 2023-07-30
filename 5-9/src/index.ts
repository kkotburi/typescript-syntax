enum Role {
  LIBRARIAN, // 사서
  MEMBER, // 구성원
}

abstract class User {
  constructor(public name: string, public age: number) {}
  abstract getRole(): Role;
}

class Librarian extends User {
  constructor(name: string, age: number) {
    super(name, age);
  }
  getRole(): Role {
    return Role.LIBRARIAN;
  }
}

class Member extends User {
  constructor(name: string, age: number) {
    super(name, age);
  }
  getRole(): Role {
    return Role.MEMBER;
  }
}

class Book {
  constructor(
    public title: string,
    public author: string,
    public publishedDate: Date
  ) {}
}

interface RentManager {
  getBooks(): Book[]; // 도서관의 현재 도서 목록을 확인하는 함수
  addBook(user: User, book: Book): void; // 사서가 도서관에 새로운 도서를 입고할 때 호출하는 함수
  removeBook(user: User, book: Book): void; // 사서가 도서관에서 도서를 폐기할 때 호출하는 함수
  rentBook(user: User, book: Book): void; // 사용자가 책을 빌릴 때 호출하는 함수
  returnBook(user: User, book: Book): void; // 사용자가 책을 반납할 때 호출하는 함수
}

class Library implements RentManager {
  private books: Book[] = [];
  // rentedBooks는 user의 대여 이력을 관리
  private rentedBooks: Map<string, Book> = new Map<string, Book>();

  getBooks(): Book[] {
    // 깊은 복사를 하여 외부에서 books를 수정하는 것을 방지
    return JSON.parse(JSON.stringify(this.books));
  }

  addBook(user: User, book: Book): void {
    if (user.getRole() !== Role.LIBRARIAN) {
      console.log("사서만 도서를 추가할 수 있습니다.");
      return;
    }
    this.books.push(book);
  }

  removeBook(user: User, book: Book): void {
    if (user.getRole() !== Role.LIBRARIAN) {
      console.log("사서만 도서를 삭제할 수 있습니다.");
      return;
    }

    const index = this.books.indexOf(book);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  rentBook(user: User, book: Book): void {
    if (user.getRole() !== Role.MEMBER) {
      console.log("user만 도서를 대여할 수 있습니다.");
      return;
    }

    if (this.rentedBooks.has(user.name)) {
      console.log(
        `${user.name}님은 이미 다른 책을 대여 중이라 빌릴 수 없습니다.`
      );
    } else {
      this.rentedBooks.set(user.name, book);
      console.log(`${user.name}님이 [${book.title}] 책을 빌렸습니다.`);
    }
  }

  returnBook(user: User, book: Book): void {
    if (user.getRole() !== Role.MEMBER) {
      console.log("user만 도서를 반납할 수 있습니다.");
      return;
    }

    if (this.rentedBooks.get(user.name) === book) {
      this.rentedBooks.delete(user.name);
      console.log(`${user.name}님이 [${book.title}] 책을 반납했습니다.`);
    } else {
      console.log(`${user.name}님은 [${book.title}] 책을 빌린 적이 없습니다.`);
    }
  }
}

const main = () => {
  const myLibrary = new Library();
  const librarian = new Librarian("rtani", 27);
  const member1 = new Member("developer", 25);
  const member2 = new Member("reader", 30);

  const book1 = new Book("TypeScript 문법 종합반", "강창민", new Date());
  const book2 = new Book("금쪽이 훈육하기", "오은영", new Date());
  const book3 = new Book("요식업은 이렇게!", "백종원", new Date());

  myLibrary.addBook(librarian, book1);
  myLibrary.addBook(librarian, book2);
  myLibrary.addBook(librarian, book3);
  const books = myLibrary.getBooks();
  console.log("대여할 수 있는 도서 목록:", books);

  myLibrary.rentBook(member1, book1);
  myLibrary.rentBook(member2, book2);

  myLibrary.returnBook(member1, book1);
  myLibrary.returnBook(member2, book2);
};

main();
