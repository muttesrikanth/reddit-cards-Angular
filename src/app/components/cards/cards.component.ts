import { Component } from '@angular/core';
import { HttpcallService } from '../../services/httpcall.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  posts: any[] = [];
  constructor(private http: HttpcallService) {}

  ngOnInit(): void {
    this.http.fetchPosts().subscribe((response: any) => {
      this.posts = response.data.children.map((child: any) => ({
        title: child.data.title,
        selfTextHTML: this.cleanHTML(child.data.selftext_html),
        url: child.data.url,
        score: child.data.score,
      }));
    });
  }

  private cleanHTML(html: string | null | undefined): string {
    console.log('Raw HTML:', html); // Log the raw HTML input

    if (!html) {
      return '';
    }

    const cleanedHtml = html
      .replace(/<!--\s?SC_OFF\s?-->/g, '')
      .replace(/<!--\s?SC_ON\s?-->/g, '')
      .trim();

    const textArea = document.createElement('textarea');
    textArea.innerHTML = cleanedHtml;
    const decodedHtml = textArea.value;

    console.log('Cleaned and Decoded HTML:', decodedHtml); // Log the cleaned HTML
    return decodedHtml;
  }
}
