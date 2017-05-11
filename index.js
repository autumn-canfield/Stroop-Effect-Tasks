var color_names = ['red', 'green', 'blue', 'yellow'];
var nonsense_names = ['wub', 'vus', 'nuk', 'jaf', 'feb', 'tov', 'zek']
var colors = ['#ee1100', '#00ee22', '#0000ee', '#ffef00'];

var test_number = 0;
var test_timings = [0, 0, 0, 0];
var timer_running = false;
var timer_value = 0;

function for_each_table_element(func)
{
   for(var x=0; x<5; x++)
   {
      for(var y=0; y<6; y++)
      {
         func(document.getElementById('table').rows[y].cells[x]);
      }
   }
}

function set_color_names()
{
   for_each_table_element(function (cell){
      cell.innerHTML = color_names[Math.floor(Math.random()*color_names.length)];
   });
}

function set_nonsense_names()
{
   for_each_table_element(function (cell){
      cell.style.backgroundColor = 'initial';
      cell.innerHTML = nonsense_names[Math.floor(Math.random()*nonsense_names.length)];
   });
}

function set_random_colors()
{
   for_each_table_element(function (cell){
      cell.style.color = colors[Math.floor(Math.random()*colors.length)];
   });
}

function set_background_colors()
{
   for_each_table_element(function (cell){
      cell.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
      cell.innerHTML = '';
   });
}

function clear_cells()
{
   for_each_table_element(function (cell){
      cell.style.backgroundColor = 'initial';
      cell.style.color = 'initial';
      cell.innerHTML = '';
   });
}

function button_click()
{
   if(!timer_running)
   {
      timer_running = true;
      document.getElementById('button').innerHTML = 'Finish';
      var d = new Date();
      timer_value = d.getTime();
      switch(test_number)
      {
         case 0:
            set_color_names();
            break;
         case 1:
            set_background_colors();
            break;
         case 2:
            set_nonsense_names();
            set_random_colors();
            break;
         case 3:
            set_random_colors();
            set_color_names();
            break;
      }
   }
   else
   {
      timer_running = false;
      document.getElementById('button').innerHTML = 'Start';
      var d = new Date();
      var new_timer_value = d.getTime();
      test_timings[test_number] = new_timer_value-timer_value;

      switch(test_number)
      {
         case 0:
            clear_cells();
            document.getElementById('table').rows[1].cells[2].innerHTML =
               'Instructions:</br>The next test will have blocks of solid color. Say the names of the colors. Then press finish.'
            test_number++;
            break;
         case 1:
            clear_cells();
            document.getElementById('table').rows[1].cells[2].innerHTML =
               'Instructions:</br>The next test will have nonsense words with different ink colors. Say the names of the ink color. Then press finish.'
            test_number++;
            break;
         case 2:
            clear_cells();
            document.getElementById('table').rows[1].cells[2].innerHTML =
               'Instructions:</br>The next test will have the names of different colors. Say the names of the ink color, not what the text says. Then press finish.'
            test_number++;
            break;
         case 3:
            clear_cells();
            document.getElementById('table').rows[1].cells[2].innerHTML = 
                    '</br>Finished!</br>Please copy these results and paste them into the survey. </br>Results:</br>' + String(test_timings);
            document.getElementById('button').disabled = true;
            break;
      }
   }
}

