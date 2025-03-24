import { render, screen } from '@testing-library/angular';  
import { AppComponent } from './../app/app.component';  

// Simple test check
describe('AppComponent', () => {  
  it('should contain main element', async () => {  
    await render(AppComponent);  
  
    const main = screen.getByRole('main') 
    expect(main).toBeDefined()  
  });  
});