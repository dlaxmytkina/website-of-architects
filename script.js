const svg_slideProjects = $(".projects .nav");
const button_replaceProjects = $(".block_projects .buttons > div")

function new_slide_caption(a, name) {
    return `<div class="caption ${a}_caption">
${name}
<div class="button">view more
    <svg width="19" height="9" viewBox="0 0 19 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M0.935303 4.5C0.935303 4.22386 1.15916 4 1.4353 4L17.4353 4C17.7114 4 17.9353 4.22386 17.9353 4.5C17.9353 4.77614 17.7114 5 17.4353 5L1.4353 5C1.15916 5 0.935303 4.77614 0.935303 4.5Z" />
        <path fill-rule="evenodd" clip-rule="evenodd"
            d="M13.5817 0.646447C13.777 0.451184 14.0936 0.451184 14.2889 0.646447L18.1424 4.5L14.2889 8.35355C14.0936 8.54882 13.777 8.54882 13.5817 8.35355C13.3865 8.15829 13.3865 7.84171 13.5817 7.64645L16.7282 4.5L13.5817 1.35355C13.3865 1.15829 13.3865 0.841709 13.5817 0.646447Z" />
    </svg>
</div>

</div>`
}

svg_slideProjects.eq(0).click(slide_prev_project)
svg_slideProjects.eq(1).click(slide_next_project)

button_replaceProjects.click(replace_project_with);

function replace_project_with() {
    let page;
    if ($(this).is(button_replaceProjects.eq(0))) {
        page = "prev"
    } else page = "next"
    console.log(button_replaceProjects.eq(0).is($(this)));
    let block = $(".block_projects"),
        data = data_for_page.call(this, page);
    console.log(data);
    block.find(".left_side p").text(data.name);
    block.find(".right_side img")
        .css({
            "opacity": "0",
            "transition": "0s"
        })
        .attr("src", data.img);
    $(this).css("pointer-events", "none");
    data.other_button.css("pointer-events", "auto");
    block.find(".left_side .pages").prepend(`<span class='${page}_page'>${data.page_num}</span>`)
    setTimeout(function () {
        block.find(".right_side img").css({
            "opacity": "1",
            "transition": "1s"
        })
        $(`.${page}_page`).removeClass(`${page}_page`).next().addClass(page === "next" ? "prev_page" : "next_page")
    }, 0)
    setTimeout(() => {
        $(page === "next" ? ".prev_page" : ".next_page").remove()
    }, 500);


}
function data_for_page(page) {
    if (page === "next") {
        let but = $(this).prev();
        console.log(but);
        return {
            name: "The second project",
            img: "./assets/thesecondProject.jpg",
            other_button: but,
            page_num: "02"
        }
    } else {
        let but = $(this).next();
        console.log(but);
        return {
            name: "The first project",
            img: "./assets/thefirstProject.jpg",
            other_button: but,
            page_num: "01"
        }
    }
}


let projects_img = ["./assets/1et_doma_29.jpg", "./assets/85cd6ce9b47b80570gXIgRV9MtRnKBkS.jpg", "./assets/post_4371.jpg",
    "./assets/project5.jpg", "./assets/project6.jpg", "./assets/project4.jpg", "./assets/project7.jpg", "./assets/project8.jpg", "./assets/project9.jpg"],
    projects_caption = ["Sample Project 9", "Sample Project", "Sample Project 2", "Sample Project 3", "Sample Project 4", "Sample Project 5", "Sample Project 6", "Sample Project 7", "Sample Project 8"]

function slide_next_project() {


    let center_img = $(".center_img"),
        right_img = $(".back_rightImg"),
        left_img = $(".back_LeftImg"),
        back_img = $(".back_new_img")
    let indOf = projects_img.indexOf(right_img.attr("src"));
    let index = indOf === projects_img.length - 1 ? 0 : indOf + 1

    back_img.attr("src", projects_img[index])
    center_img.css("transition", "1s").removeClass("center_img").addClass("back_LeftImg")
    right_img.css("transition", "1s").removeClass("back_rightImg").addClass("center_img")
    left_img.css("transition", "1s").removeClass("back_LeftImg").addClass("back_new_img")
    back_img.css("transition", "1s").removeClass("back_new_img").addClass("back_rightImg")
    svg_slideProjects.css("pointer-events", "none")
    let new_caption = $(new_slide_caption("next", projects_caption[indOf]))
    $('.cards').append(new_caption)
    $(".caption_active").removeClass("caption_active").css({
        "left": "0",
        "opacity": "0",
        "pointer-events": "none"
    });

    setTimeout(function () {
        new_caption.removeClass("next_caption").addClass("caption_active").removeAttr("style")
    }, 0)

    setTimeout(function () {
        $(".caption:not(.caption_active)").remove()
        svg_slideProjects.css("pointer-events", "auto")
    }, 1000)


}
function slide_prev_project() {

    let center_img = $(".center_img"),
        right_img = $(".back_rightImg"),
        left_img = $(".back_LeftImg"),
        back_img = $(".back_new_img")

    let indOf = projects_img.indexOf(left_img.attr("src"));
    let index = indOf === 0 ? projects_img.length - 1  : indOf - 1

    back_img.attr("src", projects_img[index])
    center_img.css("transition", "1s").removeClass("center_img").addClass("back_rightImg")
    right_img.css("transition", "1s").removeClass("back_rightImg").addClass("back_new_img")
    left_img.css("transition", "1s").removeClass("back_LeftImg").addClass("center_img")
    back_img.css("transition", "1s").removeClass("back_new_img").addClass("back_LeftImg")

    svg_slideProjects.css("pointer-events", "none")
    let new_caption = $(new_slide_caption("prev", projects_caption[indOf]))
    $('.cards').append(new_caption)
    $(".caption_active").removeClass("caption_active").css({
        "left": "100%",
        "transform": "translateX(-100%)",
        "opacity": "0",
        "pointer-events": "none"
    });

    setTimeout(function () {
        new_caption.removeClass("prev_caption").addClass("caption_active").removeAttr("style")
    }, 0)

    setTimeout(function () {
        $(".caption:not(.caption_active)").remove()
        svg_slideProjects.css("pointer-events", "auto")
    }, 1000)

}



